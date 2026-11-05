# JICT Online Store

Responsive e-commerce storefront for Josh Information Communication Technology (JICT), Jos, Plateau State, Nigeria.

## Technology
- Next.js 15, React 19 and TypeScript
- Supabase PostgreSQL, authentication and storage
- OpenAI API shopping assistant
- Vercel hosting and deployment

## Local development
1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the required keys.
4. Run `npm run dev` and visit http://localhost:3000.

## Supabase setup
1. Create/open your Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Run `supabase/admin-policies.sql` after the base schema.
4. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables. The service-role key is server-side only and must never be exposed in browser code.
5. Enable email authentication in Supabase.
6. Create your own account at `/account`. Find that user's UUID in Authentication > Users, then run:
   `update public.profiles set role = 'admin' where id = 'YOUR_AUTH_USER_UUID';`
7. Sign in at `/account` and open `/admin`.

The database profile trigger creates a profile row when a customer signs up. The SQL policies restrict private customer records and protect admin operations.

## OpenAI setup
Set `OPENAI_API_KEY` in Vercel as a server-side environment variable. Optionally set `OPENAI_MODEL`. The assistant reads the live Supabase product catalogue when configured; otherwise it uses the demonstration catalogue.

## Deployment
Import `https://github.com/joshua247github/jict` into Vercel, select the Next.js framework preset, add environment variables from `.env.example`, and deploy. Each push to `main` will trigger a deployment if the repository is connected to Vercel.

## Business details
- Josh Information Communication Technology (JICT)
- Jos, Plateau State, Nigeria
- 08031940875 / 08123670163
- jicthub@gmaill.com

## Important launch checklist
- Replace demonstration products, photos, prices, stock and ratings with verified JICT catalogue data.
- Configure Supabase and apply both SQL files.
- Configure OpenAI API key and test the assistant.
- Configure and test a Nigerian payment gateway (Paystack or Flutterwave) before collecting online payments. The current checkout submits an order request only; it does not charge customers.
- Set delivery charges and delivery zones.
- Test customer sign-in, admin permissions, product management and order updates.
- Configure transactional email/notifications and privacy/returns policies before public launch.
