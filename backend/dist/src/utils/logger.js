"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test')
        console.log(...params); // eslint-disable-line no-console
};
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test')
        console.error(...params); // eslint-disable-line no-console
};
exports.default = {
    info, error,
};
//# sourceMappingURL=logger.js.map