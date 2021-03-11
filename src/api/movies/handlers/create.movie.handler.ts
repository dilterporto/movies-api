import { CreateMovieRequest, MovieResponse } from "../../../core/messages";
import Movie from '../../../models/movie';
import Person, { IMovieRole } from '../../../models/person';
import ApiError from "../../../core/api.error";
import { AddSingleton } from "../../../core/ioc";
import { toRoman } from 'roman-numerals';


@AddSingleton(CreateMovieHandler)
export default class CreateMovieHandler {
  /**
   * handle post person
   */
  async handle(request: CreateMovieRequest): Promise<MovieResponse | ApiError[]> {
    
    try {

      const movie = new Movie({
        ...request
      });

      await movie.save();      

      const { 
        casting = [], 
        producers = [], 
        directors = [] 
      } = request;

      this.addMovieToPersons('casting', casting, movie.id);
      this.addMovieToPersons('producers', producers, movie.id);
      this.addMovieToPersons('directors', directors, movie.id);

      return {
        ...movie.toJSON(),        
      } as MovieResponse;

    } catch (err) {
      throw err;
    }
  }

  async addMovieToPersons(role: string, persons: string[], movie: string) {
    persons.forEach(async id => {
      const _person = await Person.findById(id);
      _person.movies
        .push({ role, movie } as IMovieRole);      
      await _person.save();
    });
  }
}