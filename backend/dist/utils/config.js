"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let MONGODB_URI = process.env.MONGODB_URI;
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CONSUMER_KEY;
let GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CLIENT_ID;
exports.default = { MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CONSUMER_SECRET };
//# sourceMappingURL=config.js.map