import prisma from './src/database.js';

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Connection failed with error:');
    console.error(error.message);
    if (error.stack) console.error(error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
