import { Sequelize } from 'sequelize';
import { logger } from '../helpers/logger.helper';

const MYSQL_URL = process.env.DB_URL as string;
export const sequelize = new Sequelize(MYSQL_URL, {
  logging: (msg) => logger.debug(msg),
});

export const connectToDb = async () => {
  try {
    logger.info('Connecting to MySQL...');

    await sequelize.authenticate();
    logger.info('Connection opened!');

    await sequelize.sync();
    logger.info('Synced database successfully...');
  } catch (error) {
    logger.error('Error in MySQL connection:', error);
  }
};
