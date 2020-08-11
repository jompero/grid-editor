"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const env = process.env.NODE_ENV;
logger_1.default.info(`Server running in ${env} environment`);
const MONGODB_URI = env === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CONSUMER_SECRET } = process.env;
exports.default = { MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CONSUMER_SECRET };
//# sourceMappingURL=config.js.map