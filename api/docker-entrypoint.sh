dockerize -wait tcp://pg-db:5432 -timeout 60s

npx prisma generate
npx prisma migrate deploy
npm run seed

npm start