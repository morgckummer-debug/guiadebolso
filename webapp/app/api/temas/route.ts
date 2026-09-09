import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { MODULOS, TEMAS } from '@/data/temas';

// Só entrega o conteúdo clínico depois de confirmar sessão válida E licença
// ativa (liberada pelo webhook do Kiwify) — é o ponto que protege o
// conteúdo de verdade, diferente da versão estática antiga.
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
    .select('status')
    .eq('email', user.email.toLowerCase())
    .eq('status', 'active')
    .maybeSingle();

  if (!license) {
    return NextResponse.json({ error: 'sem licença ativa' }, { status: 403 });
  }

  return NextResponse.json({ modulos: MODULOS, temas: TEMAS });
}
