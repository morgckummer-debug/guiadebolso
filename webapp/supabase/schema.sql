-- Rode este script no Supabase: painel do projeto → SQL Editor → New query.

create table if not exists licenses (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  kiwify_order_id text,
  status text not null default 'active' check (status in ('active', 'revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security ligado e sem policies: só o backend (service_role key,
-- que ignora RLS) lê/escreve nessa tabela. Nenhum usuário logado consegue
-- ler a tabela de licenças diretamente pelo cliente.
alter table licenses enable row level security;
