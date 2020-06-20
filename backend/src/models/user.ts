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
    console.log('returned object:', returnedObject);
    returnedObject.id = returnedObject._id.toString();
    returnedObject.profile = returnedObject.profileId.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.email;
    console.log('after toJson:', returnedObject);
  }
});

mongoose.plugin(uniqueValidator);

export default mongoose.model('User', userSchema)