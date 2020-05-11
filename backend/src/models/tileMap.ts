import mongoose from 'mongoose';

export interface TileMap {
  id: String,
  _id: mongoose.Types.ObjectId,
  width: number,
  height: number,
  tileMap: number[]
}

const tileMapSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String,
      minLength: 3
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
});


tileMapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
export default mongoose.model('TileMap', tileMapSchema)