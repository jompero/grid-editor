"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth_1 = __importDefault(require("passport-google-oauth"));
const config_1 = __importDefault(require("./config"));
const user_1 = __importDefault(require("../models/user"));
passport_1.default.use(new passport_google_oauth_1.default.OAuth2Strategy({
    clientID: config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.GOOGLE_CONSUMER_SECRET,
    callbackURL: '/callback'
}, function (token, tokenSecret, profile, done) {
    user_1.default.findByIdAndUpdate({ googleId: profile.id }, { name: profile.displayName, profileId: profile.id }, { upsert: true }, function (err, user) {
        return done(err, user);
    });
}));
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    next(new Error('not authenticated'));
};
exports.isAuthorized = (req, res, next) => {
    const user = req.user;
    if (user_1.default.findOne({ profileId: user.id })) {
        next();
    }
    else {
        next(new Error('not authorized'));
    }
};
//# sourceMappingURL=passport.js.map