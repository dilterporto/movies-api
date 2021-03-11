import { PersonResponse, CreatePersonRequest } from "../../../core/messages";
import Person from '../../../models/person';
import ApiError from "../../../core/api.error";
import { AddSingleton } from "../../../core/ioc";

@AddSingleton(CreatePersonHandler)
export default class CreatePersonHandler {
  /**
   * handle post person
   */
  async handle(request: CreatePersonRequest): Promise<PersonResponse | ApiError[]> {
    
    try {
      const person = new Person(request);
      await person.save();
          
      return person.toJSON() as PersonResponse;

    } catch (err) {
      throw err;
    }
  }
}