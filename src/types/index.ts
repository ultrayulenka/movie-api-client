interface Movie {
  id: number;
  name: string;
  poster: string;
  description: string;
  year: number;
  genre: string;
  rating: number;
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

export type { Movie, User, Role };
