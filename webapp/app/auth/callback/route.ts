import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Depois do login com Google, o Supabase redireciona pra cá com um `code`
// — trocamos ele por uma sessão de verdade antes de mandar pro app.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/app`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
