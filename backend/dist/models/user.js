"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const logger_1 = __importDefault(require("../utils/logger"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    profileId: {
        type: String,
        required: true,
        unique: true,
    },
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        logger_1.default.info('before toJSON:', returnedObject);
        returnedObject.id = returnedObject._id.toString();
        returnedObject.profile = returnedObject.profileId.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.email;
        logger_1.default.info('after toJSON:', returnedObject);
    },
});
mongoose_1.default.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map