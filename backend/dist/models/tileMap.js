"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tileMapSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
        minLength: 3
    },
    width: {
        required: true,
        type: Number
    },
    height: {
        required: true,
        type: Number
    },
    tileMap: {
        required: true,
        type: [Number]
    },
});
tileMapSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = mongoose_1.default.model('TileMap', tileMapSchema);
//# sourceMappingURL=tileMap.js.map