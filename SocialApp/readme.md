SocialApp
npm init -y
npm install express prisma @prisma/client
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init
npx prisma generate
https://www.prisma.io/docs/orm/prisma-client/queries/crud
