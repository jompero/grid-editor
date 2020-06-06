import mongoose, { MongooseDocument } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface TileMap {
  id?: String,
  _id?: mongoose.Types.ObjectId,
  name: string,
  width: number,
  height: number,
  tileMap: number[],
  tileSet: string,
  user: MongooseDocument
}

const tileMapSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String,
      minLength: 3,
      unique: true
    },
    width: {
      required: true,
      type: Number
    },
    height: {
      required: true,
      type: Number
    },
    tileMap: {
      required: true,
      type: [Number]
    },
    tileSet: {
      type: String,
      required: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


tileMapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
mongoose.plugin(uniqueValidator);

export default mongoose.model('TileMap', tileMapSchema)