import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IPerson } from './person';
import { toRoman } from 'roman-numerals';

export interface ICredit extends Document {
  person: string;
  type: string;
}

export interface IMovie extends Document {
  title: string;
  releasedAt: string;
  casting: IPerson[];
  producers: IPerson[];
  directors: IPerson[];
}

const MovieSchema = new Schema({
  title: String,
  releaseYear: Number,
  casting: [{
    type: Schema.Types.ObjectId,      
    ref: 'Person'
  }],
  producers: [{
    type: Schema.Types.ObjectId,      
    ref: 'Person'
  }],
  directors: [{
    type: Schema.Types.ObjectId,      
    ref: 'Person'
  }]  
}, { versionKey: false });

MovieSchema.virtual('releasedAt')
  .get(() => {
    return toRoman(this.releaseYear);
  });

export default mongoose.model<IMovie>('Movie', MovieSchema);
