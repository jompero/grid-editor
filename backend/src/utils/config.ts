import dotenv from 'dotenv';

dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI;
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CONSUMER_SECRET;

export default { MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CONSUMER_SECRET };