import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { MODULOS, TEMAS, type Tema } from '@/data/temas';

// Temas de amostra gratuita — ficam sempre liberados, mesmo pra quem nunca
// comprou e já passou dos 7 dias de trial (modelo freemium).
const IDS_GRATIS = new Set(['doppler-introducao', 'percentil8']);

type TemaBloqueado = { id: string; titulo: string; modulo: string; tags: string[]; bloqueado: true };

// Confirma sessão válida e decide o nível de acesso: licença ativa (compra
// via Kiwify) ou trial dentro do prazo dão acesso completo aos 14 temas;
// fora disso, cai pro plano gratuito — mostra o índice inteiro, mas só
// libera de verdade o conteúdo clínico dos temas de amostra, sem vazar o
// conteúdo pago pela API pros demais (viram só id/título/módulo/tags).
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'não autenticado' }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: license } = await admin
    .from('licenses')
    .select('status, trial_ends_at')
    .eq('email', user.email.toLowerCase())
    .maybeSingle();

  const emTrial = license?.status === 'trial' && !!license.trial_ends_at && new Date(license.trial_ends_at) > new Date();
  const acessoCompleto = license?.status === 'active' || emTrial;

  if (acessoCompleto) {
    return NextResponse.json({
      modulos: MODULOS,
      temas: TEMAS,
      acesso: emTrial ? { nivel: 'trial', trialTerminaEm: license!.trial_ends_at } : { nivel: 'completo' },
    });
  }

  const temas: (Tema | TemaBloqueado)[] = TEMAS.map((t) =>
    IDS_GRATIS.has(t.id) ? t : { id: t.id, titulo: t.titulo, modulo: t.modulo, tags: t.tags, bloqueado: true },
  );

  return NextResponse.json({ modulos: MODULOS, temas, acesso: { nivel: 'gratuito' } });
}
