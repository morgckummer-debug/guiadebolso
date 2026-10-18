-- Rode este script no Supabase: painel do projeto → SQL Editor → New query.
-- É seguro rodar de novo (idempotente) — inclusive se `licenses` já existir.

create table if not exists licenses (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  kiwify_order_id text,
  status text not null default 'trial' check (status in ('trial', 'active', 'revoked')),
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migração para bancos que já tinham a tabela antes do trial existir.
alter table licenses drop constraint if exists licenses_status_check;
alter table licenses add constraint licenses_status_check check (status in ('trial', 'active', 'revoked'));
alter table licenses add column if not exists trial_ends_at timestamptz;

-- Row Level Security ligado e sem policies: só o backend (service_role key,
-- que ignora RLS) lê/escreve nessa tabela. Nenhum usuário logado consegue
-- ler a tabela de licenças diretamente pelo cliente.
alter table licenses enable row level security;

-- Trial de 7 dias: toda conta nova (e-mail/senha ou Google) recebe acesso
-- completo por 7 dias a partir do cadastro. Depois disso, sem compra, a
-- API (/api/temas) já cai sozinha pro plano gratuito — não precisa mexer
-- aqui de novo quando o trial vencer.
create or replace function public.iniciar_trial_novo_usuario()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.licenses (email, status, trial_ends_at)
  values (lower(new.email), 'trial', now() + interval '7 days')
  on conflict (email) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.iniciar_trial_novo_usuario();

-- Backfill único: dá 7 dias de trial, a partir de agora, pra quem já tinha
-- conta antes desse recurso existir e nunca comprou (sem linha em
-- `licenses`). Idempotente — quem já tem licença não é afetado.
insert into public.licenses (email, status, trial_ends_at)
select lower(u.email), 'trial', now() + interval '7 days'
from auth.users u
left join public.licenses l on l.email = lower(u.email)
where l.email is null and u.email is not null
on conflict (email) do nothing;

-- Keep-alive do plano gratuito: o Supabase pausa o projeto sem atividade no
-- banco. Um GET no REST que cai numa tabela com RLS sem policies pode voltar
-- vazio sem gerar atividade de verdade; esta função escreve uma linha numa
-- tabela pequena, então toda chamada conta como atividade no Postgres.
-- Só dá para chamar como `anon`, e ela não expõe nem altera dados de usuários.
create table if not exists keepalive (
  id int primary key default 1 check (id = 1),
  last_ping timestamptz not null default now()
);
alter table keepalive enable row level security;

create or replace function public.keepalive()
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  agora timestamptz := now();
begin
  insert into public.keepalive (id, last_ping)
  values (1, agora)
  on conflict (id) do update set last_ping = excluded.last_ping;
  return agora;
end;
$$;

grant execute on function public.keepalive() to anon;
