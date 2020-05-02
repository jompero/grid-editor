"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const maps_1 = __importDefault(require("./routes/maps"));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const publicFolder = path_1.default.join(__dirname, 'public');
console.log('loading static content from', publicFolder);
app.use(express_1.default.static(publicFolder));
app.use('/api/', index_1.default);
app.use('/api/users', users_1.default);
app.use('/api/maps', maps_1.default);
module.exports = app;
//# sourceMappingURL=app.js.map