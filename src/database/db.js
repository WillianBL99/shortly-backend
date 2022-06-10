import pg from 'pg';
import dotenv from 'dotenv';
const {Pool} = pg;
dotenv.config();

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
};

console.log('ssl');
if(process.env.MODE === 'PROD') {

console.log('ssl2');
  databaseConfig.ssl = {
    rejectUnauthorized: false
  }
}

const connection = new Pool(databaseConfig);

export default connection;