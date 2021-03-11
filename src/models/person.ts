import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IMovie } from './movie';

export interface IPerson extends Document {
  firstName: string;
  lastName: string;
  aliases: string[];
  genre: string;
  movies: IMovieRole[];
}

export interface IMovieRole extends Document {
  role: string;
  movie: string;
}

const MovieRoleSchema = new Schema({  
  role: String,
  movie: {
    type: Schema.Types.ObjectId,      
    ref: 'Movie'
  }
});

const PersonSchema = new Schema({
  firstName: String,
  lastName: String,
  aliases: [String],
  movies: [MovieRoleSchema],
  genre: {
    type: String,
    enum: [ 'female', 'male' ]
  }
}, { collection: 'persons', versionKey: false });

export default mongoose.model<IPerson>('Person', PersonSchema);
