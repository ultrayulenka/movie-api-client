interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string;
  year: number;
  genre: string;
  rating: number;
  reviews: Array<Review>
}

interface User {
  id?: number;
  email: string;
  username: string;
  permissions?: Array<string>;
}

interface Role {
  name: string;
}

interface Review {
  id: number;
  text: 'string';
  rate: number;
  movieId: number;
  userId: number;
  createdAt: string;
}

export type { Movie, User, Role, Review };
