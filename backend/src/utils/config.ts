import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const env = process.env.NODE_ENV;
logger.info(`Server running in ${env} environment`);
const MONGODB_URI = env === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CONSUMER_SECRET } = process.env;

export default { MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CONSUMER_SECRET };
