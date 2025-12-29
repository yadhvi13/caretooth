### Caretooth is made with Next.JS and with ShadCN
- npx shadcn@latest init
- npx shadcn@latest add -- for accessing the components

### tweakcn for customization of the theme using shadcn
- using hex code

### For Authentication, we are using Clerk
- npm install @clerk/nextjs
- set .env key
- use middleware.ts
- use and wrap your app(layout.tsx) in clerkprovider
