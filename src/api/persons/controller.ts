import { Body, Controller, Post, Route, Tags, SuccessResponse, Response, Query, Get } from 'tsoa';
import { AddSingleton, inject } from '../../core/ioc';
import { CreatePersonRequest, PersonResponse } from '../../core/messages';
import ApiError from '../../core/api.error';
import CreatePersonHandler from './handlers/create.person.handler';
import FindPersonsHandler from './handlers/find.persons.handler';

/**
 * Persons controller
 */
@Tags('persons')
@Route('v1/persons')
@AddSingleton(PersonsController)
export class PersonsController extends Controller {
  constructor (
    @inject(CreatePersonHandler) private createPersonHandler: CreatePersonHandler,
    @inject(FindPersonsHandler) private findPersonsHandler: FindPersonsHandler
  ) {
    super();
  }

  /**
   * creates a person
   * @param body
   */
  @SuccessResponse('201', 'Person Created Successfuly')
  @Response<ApiError>('422', 'Malformed Request')  
  @Post()
  public async postPerson (@Body() body: CreatePersonRequest): Promise<PersonResponse | ApiError[]> {
    try {    
      
      return await this.createPersonHandler.handle(body);
      
    } catch (err) {
      this.setStatus(500);
      const errors: ApiError[] = [
        {
          error: {
            code: 0,
            message: err.message
          }
        }
      ];
      return errors;
    }
  }

  @SuccessResponse('200')
  @Response<ApiError>('500', 'Internal Application Error')  
  @Get()
  public async getPersons(@Query() includeMovies: boolean): Promise<PersonResponse[] | ApiError[]> {
    
    return await this.findPersonsHandler.handle(includeMovies);

  }
}
