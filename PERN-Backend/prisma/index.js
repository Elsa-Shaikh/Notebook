const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

console.log("Database_URL: ",process.env.DATABASE_URL);

prisma.$connect()
  .then(() => {
    console.log('Connected to the database PostgresSQL');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    if (error instanceof Error && error.code === 'P5002') {
      console.error('This is a Prisma Client connection error (P5002). Check your database connection details and Prisma schema.');
    }
    process.exit(1); // Exit the process if there's an error connecting to the database
  });

module.exports = prisma