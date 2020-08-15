#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const logger_1 = __importDefault(require("../utils/logger"));
const app_1 = __importDefault(require("../app"));
const server = http_1.default.createServer(app_1.default);
const port = app_1.default.get('port');
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    logger_1.default.info(`Listening on ${bind}`);
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof app_1.default.get('port') === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            logger_1.default.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger_1.default.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//# sourceMappingURL=www.js.map