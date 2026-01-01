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

### For Cloud we are using Neon with AWS, In connect database, it will give us connection string and we will use PRISMA
- first, get the .env
- second, with the PRISMA

### What is PRISMA??
- PRISMA is an ORM(object relational mapping) it works as a translator between your code and your database
- By writing simple JAVASCRIPT/TYPESCRIPT code, it translates it for your database.

### For setting up with the Voice Agent, we are using VAPI
- ist, create assistants and copy the assistant ID
