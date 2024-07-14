alter table users enable row level security;
create policy "Users can view own user data." on users for select using (auth.uid() = id);
create policy "Users can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, image, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.created_at);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/

create function public.update_public_user_info()
returns trigger as $$
begin
  update public.users
  set email_verified = new.email_confirmed_at, updated_at = new.updated_at, name = new.raw_user_meta_data->>'full_name'
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.update_public_user_info();
