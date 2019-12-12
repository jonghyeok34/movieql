export var movies = [
  {
    id: 0,
    name: "Star Wars - 1",
    score: 1
  },
  {
    id: 1,
    name: "Avengers - 1",
    score: 8
  },
  {
    id: 2,
    name: "The Godfather - 1",
    score: 9
  },
  {
    id: 3,
    name: "train to busan",
    score: 8
  }
];

export const getMovies = () => movies;

export const getById = id => {
  const filteredMovie = movies.filter(movie => id === movie.id);
  return filteredMovie[0];
};

export const deleteMovie = id => {
  const cleanedMovies = movies.filter(movie => movie.id !== id);
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
};

export const addMovie = (name, score) => {
  const newMovie = {
    id: `${movies.length + 1}`,
    name,
    score
  };
  movies.push(newMovie);
  return newMovie;
};
