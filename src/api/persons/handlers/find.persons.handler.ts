import { PersonResponse } from "../../../core/messages";
import Person from '../../../models/person';
import ApiError from "../../../core/api.error";
import { AddSingleton } from "../../../core/ioc";

@AddSingleton(FindPersonsHandler)
export default class FindPersonsHandler {
  /**
   * handle post person
   */
  async handle(includeMovies: boolean): Promise<any> {
    
    try {

      let query = Person.find();

      if (includeMovies) {
        query = query.populate({
          path: 'movies.movie',
          select: '-_id -casting -producers -directors'
        });
      }

      return query.exec();

    } catch (err) {
      throw err;
    }
  }
}