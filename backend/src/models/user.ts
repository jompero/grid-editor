import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface User extends mongoose.Document {
  name: string,
  email: string,
  profileId: string,
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
  }
});


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.user._id;
    delete returnedObject.user._v;
    delete returnedObject.user.profileId;
  }
});

mongoose.plugin(uniqueValidator);

export default mongoose.model('User', userSchema)