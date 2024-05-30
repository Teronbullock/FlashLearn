import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DATABASE_URL;

const sequelize = new Sequelize( database, {
  logging: false,
});

export default sequelize;