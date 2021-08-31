# Profiles App

This is a proof of concept / playground for a next.js application with authentication with a backend.

Pages prefixed with `/rq` are using `react-query`. I wanted to have a `react-query` and non `react-query`
page to compare code and user experience side by side.

## Technologies used

- Next.js - react framework
- supabase - authn, authz (postgres row level security), postgres, realtime updates
- react-query - data fetching library to handle de-duping requests, caching, etc
- chakra-ui - react ui component library

### Not yet implemented

- react-hook-form

## Pre-requisites

1. Sign up for a supabase account
2. Grab the supabase url and anon key from settings
3. Create an `.env.local` file

Set these values to your own in the `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Run this sql command in the supabase editor:

```sql
-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  name varchar,
  bio text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update an avatar."
  on storage.objects for update
  with check ( bucket_id = 'avatars' );
```

This is a _slightly_ modified version of their "User Management Starter" query.
This sets up some columns, row level permissioning, realtime, and storage.

## How to run

Install dependencies (`yarn`) and then start the dev server with `yarn dev`.
The app should be visible on `localhost:3000`
