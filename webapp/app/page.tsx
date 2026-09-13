import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// getSession() lê a sessão do cookie local, sem chamada de rede pro Supabase
// (só faz rede se o token já venceu e precisa renovar) — suficiente aqui
// porque essa rota só decide o destino do redirect, não é o guard de
// segurança. Quem garante acesso de verdade a /app é o proxy.ts (matcher
// '/app/:path*'), que usa getUser() e valida contra o servidor. Usar
// getUser() aqui também duplicaria essa mesma chamada de rede em sequência
// com a do proxy, sem ganho de segurança nenhum — só mais alguns segundos
// de tela branca antes da splash, sobretudo ao abrir pelo ícone fixado na
// tela do iPhone (iOS derruba as conexões de rede do app em segundo plano,
// então reabrir exige DNS+TLS novos com o servidor de autenticação).
export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  redirect(session ? '/app' : '/login');
}
