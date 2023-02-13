import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();
const redisClient = async () => {
  try {
    await client.connect();
    logger.info('Succesfully Connected With Redis DataBase.');
  } catch (error) {
    logger.error('Redis DataBase Connection NOT Succesful', error);
  }
};

export default redisClient;
