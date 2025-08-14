This is a next js project that uses
## Features
- List all properties
- Allow users to search properties by location, price, and other criteria
- Allow users to view property details
- Allow users to bookmark properties
- Allow users to contact property owners
- Allow the admins to add, edit, and delete properties
- Allow the admins to manage users
- Allow the admins to manage bookings
- Allow the admins to manage reviews

- tailwind + shadcn/ui for the frontend
  - [global styles in](src/app/globals.css)
- Drizzle with postgress for database management
  - [schema in ](src/lib/drizzle/schema.ts)
  - [migrations in](drizzle/migrations)
- Better auth for user authentication
- Cloudflare R2 for storage via the aws sdk + better upload integration
  - - [better upload docs](https://better-upload.com/docs/quickstart)
- - [client in](src/lib/cloudflare/r2/client.ts)
  - [upload API in](src/app/api/upload/route.ts)
- - [upload section in](src/components/property/form/sections/ImagesUploadSection.tsx)

Preferences:
- Avoid using as any escape hatches as much as possible
- Put components related to a route in the same folder as the route in `/_components` directory
- use `nuqs` for search params in client components
- eg if we have a server component listing properties, the search box which will be a client component will have a nuqs hook that updates the search params in the URL to trigger a re-refetch of the server component
-if a component goe over 250 lines, consider breaking it down into smaller components
- Nextjs app router uses suspense for data fetchinig meaning
 - when fetching in a seraver compoennt (recomended) put all the logic inan async component and call it in the page while wrapped in a suspense boundary
 - if it makes sense to use a client component , do the same as bove prefetch the data in the server component and pass it down to the client component as props
- do not run the linter unless explicitely asked to `npm run lint` run the type checker instead `npx tsc --noEmit`
