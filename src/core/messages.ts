class Movie {

}

class RoleMovie {
  role: string;
  movie: Movie;
}

enum Genre {
  male = 'male',
  female = 'female'
}

export class Person {
  firstName: string;
  lastName: string;
  genre: Genre;
  aliases?: string[];
}

export class CreatePersonRequest extends Person {
  
}

export class PersonResponse extends Person {
  id: string;
  movies: RoleMovie[];
}

class Credit {

}

export class CreateMovieRequest {
  title: string;
  releaseYear: number;
  casting?: string[];
  directors?: string[];
  producers?: string[];
}

export class MovieResponse {
  id: string;
  title: string;
  releaseYear: string;
  casting?: Person[];
  directors?: Person[];
  producers?: Person[];
}

