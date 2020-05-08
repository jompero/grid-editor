"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
mongoose_1.default.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connection to MongoDB:', error.message);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoose.js.map