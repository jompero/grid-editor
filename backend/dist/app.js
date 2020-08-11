"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const users_1 = __importDefault(require("./controllers/users"));
const maps_1 = __importDefault(require("./controllers/maps"));
const testing_1 = __importDefault(require("./controllers/testing"));
const logger_1 = __importDefault(require("./utils/logger"));
const env = process.env.NODE_ENV;
logger_1.default.info(`server running in ${env || 'default'} environment`);
logger_1.default.info('connecting to MongoDB:', config_1.default.MONGODB_URI);
mongoose_1.default.connect(config_1.default.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connection to MongoDB:', error.message);
});
const app = express_1.default();
app.use(morgan_1.default('short'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
const publicFolder = path_1.default.join(__dirname, 'public');
logger_1.default.info('loading static content from', publicFolder);
app.use(express_1.default.static(publicFolder));
app.use('/api/users/', users_1.default);
app.use('/api/maps/', maps_1.default);
if (env === 'test') {
    app.use('/api/testing/', testing_1.default);
}
//export default app;
module.exports = app;
//# sourceMappingURL=app.js.map