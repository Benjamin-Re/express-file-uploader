simplified google drive clone

run `npm i`
add db connection string DATABASE_URL in .env
add SESSION_SECRET in .env
probably initially and after every update to the DB schema you have to run `npx prisma migrate dev`(to synch db with schema) and `npx prisma generate`(to regenerate the local prisma client).

TODO:
- add signup []
- add login with prisma [x]
- add file-upload-form 
    - user can upload a file [x]
    - save the file in local filesystem [x]
- user can create a folder [x]
- user can CRUD folder [x]
- files live in folders [x]
- view file details name, size, and upload time. There should be a download button [x]
- use a cloud storage service to store uploaded files (Cloudinary or Supabase). Save file URL in db. [x]
- add navbar [x]
- protect routes so only logged in users can create folders and upload files[x]
- Only folders and files of the logged in user should be visible to him []
- add signup []
    