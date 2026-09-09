import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Cliente com a service_role key — ignora Row Level Security. Só pode ser
// importado por código que roda no servidor (Route Handlers), nunca no
// cliente: a service_role key concede acesso total ao banco.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
