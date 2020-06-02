import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface User {
  id?: String,
  _id?: mongoose.Types.ObjectId,
  name: string,
  profileId: string,
}

const userSchema = new mongoose.Schema({
  name: {
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
  }
});

mongoose.plugin(uniqueValidator);

export default mongoose.model('User', userSchema)