import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Recebe o aviso de compra/reembolso do Kiwify e libera (ou revoga) o
// acesso do e-mail correspondente na tabela `licenses`.
//
// IMPORTANTE: os nomes de campo abaixo (email, status) são os mais comuns
// na documentação pública do Kiwify, mas o formato exato pode variar por
// tipo de produto/versão da API. Antes de ativar de verdade: configure a
// URL deste endpoint no painel do Kiwify, use o botão "Enviar teste" dele,
// e confira nos logs da Vercel (Deployments → Functions → Logs) o payload
// real recebido — ajustamos os nomes de campo abaixo se for preciso.
const STATUS_ATIVA = new Set(['paid', 'approved', 'completed']);
const STATUS_REVOGADA = new Set(['refunded', 'chargedback', 'chargeback', 'canceled', 'cancelled']);

function extrairEmail(payload: any): string | null {
  return (
    payload?.Customer?.email ??
    payload?.customer?.email ??
    payload?.customer_email ??
    payload?.email ??
    null
  );
}

function extrairStatus(payload: any): string | null {
  const status = payload?.order_status ?? payload?.status ?? payload?.webhook_event_type ?? null;
  return typeof status === 'string' ? status.toLowerCase() : null;
}

function extrairOrderId(payload: any): string | null {
  return payload?.order_id ?? payload?.id ?? null;
}

export async function POST(request: NextRequest) {
  const secretEsperado = process.env.KIWIFY_WEBHOOK_SECRET;
  const secretRecebido = request.nextUrl.searchParams.get('secret');
  if (!secretEsperado || secretRecebido !== secretEsperado) {
    return NextResponse.json({ error: 'não autorizado' }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: 'payload inválido' }, { status: 400 });
  }

  const email = extrairEmail(payload)?.toLowerCase();
  const status = extrairStatus(payload);
  const orderId = extrairOrderId(payload);

  if (!email) {
    console.error('[kiwify webhook] payload sem e-mail identificável:', JSON.stringify(payload));
    return NextResponse.json({ error: 'e-mail não encontrado no payload' }, { status: 400 });
  }

  let novoStatus: 'active' | 'revoked' | null = null;
  if (status && STATUS_ATIVA.has(status)) novoStatus = 'active';
  if (status && STATUS_REVOGADA.has(status)) novoStatus = 'revoked';

  if (!novoStatus) {
    console.log('[kiwify webhook] status não mapeado, ignorado:', status, JSON.stringify(payload));
    return NextResponse.json({ ok: true, ignorado: true });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from('licenses')
    .upsert(
      { email, status: novoStatus, kiwify_order_id: orderId, updated_at: new Date().toISOString() },
      { onConflict: 'email' },
    );

  if (error) {
    console.error('[kiwify webhook] erro ao gravar licença:', error);
    return NextResponse.json({ error: 'erro ao gravar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
