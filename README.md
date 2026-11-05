# JICT Online Store

A responsive e-commerce storefront for Josh Information Communication Technology (JICT), Jos, Plateau State, Nigeria.

## Stack
- Next.js 15 / React 19 / TypeScript
- Supabase PostgreSQL and Auth (optional until environment variables are configured)
- OpenAI API shopping assistant (optional until API key is configured)
- Vercel deployment

## Local development
1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add credentials.
4. Run `npm run dev` and open http://localhost:3000.

## Supabase setup
1. Create or open your Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel.
4. For customer order saving, enable the relevant authentication methods and review the RLS policies before launch.
5. Create a trusted user and assign the admin role manually using the SQL comment at the bottom of schema.sql. Do not expose service-role credentials.

## OpenAI setup
Set `OPENAI_API_KEY` as a Vercel server-side environment variable. The API route uses the inventory data in `lib/products.ts` until a live product catalogue integration is configured.

## Deployment
Import this repository into Vercel. Framework preset: Next.js. Add environment variables from `.env.example`, then deploy.

## Business
- Josh Information Communication Technology (JICT)
- Jos, Plateau State, Nigeria
- 08031940875 / 08123670163
- jicthub@gmaill.com

## Important before accepting live orders
The current checkout is an order-request flow, not a payment gateway. It does not charge customers. Configure and test a Nigerian payment provider, order RPC/inventory transaction, transactional email/notifications, delivery pricing, admin authorization and customer account flows before public production use. Sample catalogue entries and sample prices are demonstration content; replace them with verified JICT stock and prices.
