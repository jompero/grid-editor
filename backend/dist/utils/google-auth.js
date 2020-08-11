"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const googleapis_1 = require("googleapis");
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("./logger"));
function getTokenFrom(request) {
    logger_1.default.info('auth request: ', request);
    const authorization = request.get('Authorization');
    logger_1.default.info('authorization header: ', authorization);
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7);
        logger_1.default.info('Access token: ', token);
        return token;
    }
    logger_1.default.error('No access token');
    return null;
}
function getUser(req, res, next) {
    if (process.env.NODE_ENV === 'test' && req.body) {
        logger_1.default.info('test user: ', req.body);
        user_1.default.findById(req.body.user)
            .then((user) => {
            req.user = user;
            next();
        });
    }
    else {
        const accessToken = getTokenFrom(req);
        if (!accessToken) {
            res.statusCode = 401;
            next(new Error('Request missing access token'));
        }
        const auth = googleapis_1.google.oauth2({
            version: 'v2',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        auth.userinfo.get({})
            .then((response) => {
            const user = response.data;
            logger_1.default.info('user', user);
            user_1.default.findOneAndUpdate({ profileId: user.id }, {
                name: user.name,
                email: user.email,
            }, { upsert: true, new: true })
                .then((foundUser) => {
                logger_1.default.info('passing user to req', foundUser);
                req.user = foundUser;
                next();
            });
        })
            .catch((err) => {
            logger_1.default.error(err);
            res.statusCode = 401;
            next(new Error('Unauthorized request'));
        });
    }
}
exports.getUser = getUser;
//# sourceMappingURL=google-auth.js.map