import { Body, Controller, Post, Route, Tags, SuccessResponse, Response, Query, Get } from 'tsoa';
import { AddSingleton, inject } from '../../core/ioc';
import { CreateMovieRequest, MovieResponse } from '../../core/messages';
import ApiError from '../../core/api.error';
import CreateMovieHandler from './handlers/create.movie.handler';
import FindMoviesHandler from './handlers/find.movies.handler';

/**
 * Persons controller
 */
@Tags('movies')
@Route('v1/movies')
@AddSingleton(MoviesController)
export class MoviesController extends Controller {
  constructor (
      @inject(CreateMovieHandler) private createMovieHandler: CreateMovieHandler,
      @inject(FindMoviesHandler) private findMoviesHandler: FindMoviesHandler
    ) {
    super();
  }

  /**
   * creates a person
   * @param body
   */
  @SuccessResponse('201', 'Movie Created Successfuly')
  @Response<ApiError>('422', 'Malformed Request')  
  @Post()
  public async postMovie (@Body() body: CreateMovieRequest): Promise<MovieResponse | ApiError[]> {
    try {    

      return await this.createMovieHandler.handle(body);
      
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

  /**
   * 
   * @param include 
   */
  @SuccessResponse('200')
  @Response<ApiError>('500', 'Internal Application Error')  
  @Get()
  public async getMovies(@Query() include: string[]): Promise<MovieResponse[] | ApiError[]> {
    try {    
    
      return await this.findMoviesHandler.handle(include);      
    
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
}
