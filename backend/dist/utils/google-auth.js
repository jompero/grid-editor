"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("./config"));
const user_1 = __importDefault(require("../models/user"));
const googleConfig = {
    clientId: config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.GOOGLE_CONSUMER_SECRET,
    redirect: 'https://your-website.com/google-auth'
};
const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
];
function createConnection() {
    return new googleapis_1.google.auth.OAuth2(googleConfig.clientId, googleConfig.clientSecret, googleConfig.redirect);
}
function getUser(req, res, next) {
    const accessToken = getTokenFrom(req);
    const auth = googleapis_1.google.oauth2({
        version: 'v2',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    auth.userinfo.get({})
        .then(response => {
        const user = response.data;
        console.log('user', user);
        user_1.default.findOneAndUpdate({ profileId: user.id }, {
            name: user.name,
            email: user.email
        }, { upsert: true, new: true })
            .then((user) => {
            console.log('passing user to req', user);
            req.user = user;
            next();
        });
    });
}
exports.getUser = getUser;
function getTokenFrom(request) {
    //console.log('request', request);
    const authorization = request.get('Authorization');
    //console.log('auth', authorization);
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7);
        console.log('Access token', token);
        return token;
    }
    console.log('No access token');
    return null;
}
//# sourceMappingURL=google-auth.js.map