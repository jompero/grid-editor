"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// import logger from 'morgan';
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth_1 = __importDefault(require("passport-google-oauth"));
const user_1 = __importDefault(require("./models/user"));
//import * as auth from './utils/passport';
const login_1 = __importDefault(require("./controllers/login"));
const index_1 = __importDefault(require("./controllers/index"));
const users_1 = __importDefault(require("./controllers/users"));
const maps_1 = __importDefault(require("./controllers/maps"));
const logger_1 = __importDefault(require("./utils/logger"));
logger_1.default.info('connecting to MongoDB:', config_1.default.MONGODB_URI);
mongoose_1.default.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connection to MongoDB:', error.message);
});
passport_1.default.use(new passport_google_oauth_1.default.OAuth2Strategy({
    clientID: config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.GOOGLE_CONSUMER_SECRET,
    callbackURL: '/callback'
}, function (token, tokenSecret, profile, done) {
    user_1.default.findByIdAndUpdate({ googleId: profile.id }, { name: profile.displayName, profileId: profile.id }, { upsert: true }, function (err, user) {
        return done(err, user);
    });
}));
const app = express_1.default();
// TODO: Make sure to use the 'proper' logger and create a page to inspect it
// app.use(logger('dev'));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
const publicFolder = path_1.default.join(__dirname, 'public');
console.log('loading static content from', publicFolder);
app.use(express_1.default.static(publicFolder));
app.use('/api/login/', login_1.default);
app.use('/api/', index_1.default);
app.use('/api/users/', users_1.default);
app.use('/api/maps/', maps_1.default);
module.exports = app;
//# sourceMappingURL=app.js.map