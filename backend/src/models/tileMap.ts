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
        type: String,
        minLength: 3
    },
    width: Number,
    height: Number,
    tileMap: [Number],
});


tileMapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
});
  
export default mongoose.model('TileMap', tileMapSchema)