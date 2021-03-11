import Movie from '../../../models/movie';
import ApiError from "../../../core/api.error";
import { AddSingleton } from "../../../core/ioc";

@AddSingleton(FindMoviesHandler)
export default class FindMoviesHandler {
  /**
   * handle post person
   */
  async handle(include: string[]): Promise<any[]> {    
    try {

      let findMovies = Movie.find();        
      
      if (include.includes('casting')) {
        findMovies = findMovies.populate('casting')
      }

      if (include.includes('producers')) {
        findMovies = findMovies.populate('producers')
      }
      
      if (include.includes('directors')) {
        findMovies = findMovies.populate('directors')
      }

      const movies = await findMovies.exec();

      console.log(movies);

      return movies;
      
    } catch (err) {
      throw err;
    }
  }
}