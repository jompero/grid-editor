import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;
const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CONSUMER_SECRET } = process.env;

export default { MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CONSUMER_SECRET };
