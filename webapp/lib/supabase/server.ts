import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Cliente Supabase para uso em Server Components e Route Handlers — lê a
// sessão do usuário a partir dos cookies da requisição.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // chamado de um Server Component sem permissão de escrita —
            // o middleware cuida de manter a sessão atualizada.
          }
        },
      },
    },
  );
}
