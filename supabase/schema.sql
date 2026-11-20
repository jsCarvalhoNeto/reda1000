-- Execute este script no SQL Editor do seu projeto Supabase (Dashboard -> SQL Editor)

create table if not exists public.relatorios_redacao (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  tema text not null,
  nota_final integer not null,
  resultado jsonb not null,
  criado_em timestamptz not null default now()
);

create index if not exists idx_relatorios_redacao_user_date
  on public.relatorios_redacao (user_id, criado_em desc);

alter table public.relatorios_redacao enable row level security;

create policy "Usuarios podem visualizar seus proprios relatorios"
  on public.relatorios_redacao
  for select
  using (auth.uid() = user_id);

create policy "Usuarios podem salvar seus proprios relatorios"
  on public.relatorios_redacao
  for insert
  with check (auth.uid() = user_id);

create policy "Usuarios podem excluir seus proprios relatorios"
  on public.relatorios_redacao
  for delete
  using (auth.uid() = user_id);
