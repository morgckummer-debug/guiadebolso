import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Depois do login com Google, o Supabase redireciona pra cá com um `code`
// — trocamos ele por uma sessão de verdade antes de mandar pro app.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const googleError = searchParams.get('error_description') ?? searchParams.get('error');

  if (googleError) {
    console.error('[auth/callback] erro retornado pelo provedor:', googleError);
    return NextResponse.redirect(`${origin}/login?auth_error=${encodeURIComponent(googleError)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/app`);
    }
    console.error('[auth/callback] falha ao trocar code por sessão:', error.message);
    return NextResponse.redirect(`${origin}/login?auth_error=${encodeURIComponent(error.message)}`);
  }

  return NextResponse.redirect(`${origin}/login?auth_error=${encodeURIComponent('código ausente no retorno')}`);
}
