import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import logger from '../utils/logger';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  profileId: string;
}

const userSchema = new mongoose.Schema({
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
    logger.info('before toJSON:', returnedObject);
    returnedObject.id = returnedObject._id.toString();
    returnedObject.profile = returnedObject.profileId.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.email;
    logger.info('after toJSON:', returnedObject);
  },
});

mongoose.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
