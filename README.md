# tutorial with movies

Movie API with Graphql 
Reference
1. [youtuber Nomad coders](https://www.youtube.com/watch?v=EGFxCvefehc&list=PL7jH19IHhOLOpU_yAYzCO4iQNvdou1AnK&index=13)  
2. [movie data api](https://yts.lt/api)

## start
```cmd
yarn init
question name (movieql):
question version (1.0.0):
question description: Movie API with Graphql
question entry point (index.js):
question repository url: https://github.com/jonghyeok34/movieql
question author: jonghyeok <jonghyeok34@gmail.co.kr>
question license (MIT):
question private:
success Saved package.json
Done in 203.57s.
```

```
git init .
git remote add origin https://github.com/jonghyeok34/movieql
git pull origin master
```

```
yarn add graphql-yoga
```

## 1. Problems solved by GraphQl

1. REST - problems ( overfetch/ underfetch)
- overfetch : one query fetch unusing data, too
```
/users/ GET (all profile info)  
```

- under fetch - You have to call many url by query many url for one task
```
[get from several urls]
/feed/
/notifications/
/user/1/
```

2. GraphQl : get only what you want
- request
```
query {
    feed {
        comments
        likeNumber
    }
    notifications {
        isRead
    }
    user {
        username
        profilePic
    }

}
```
- return
```
{
    feed:[
        {
            comments:1,
            likeNumber: 20
        }
    ],
    notifications: [
        {
            isRead: true
        },
        {
            isRead: false
        }
    ]
}
```

## 2. Make available to use "ES6" grammars like 'import"

1. yarn add
```
yarn add babel-node --dev
yarn global add babel-cli --ignore-engines

```
2. Add to package.json
``` js
"scripts": {
    "start": "nodemon --exec babel-node index.js" 
 },
```
3. Make .babelrc file and add 
```js
{
    "presets": ["env", "stage-3"]
}

```
4. add babel sets to dev
```cmd
yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev
```		
5. package.json 
```js
"scripts": {
    "start": "nodemon --exec babel-node index.js"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-3": "^6.24.1"
  }

```

6. index.js

```js
import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({});
server.start(() => console.log("GraphQl Server Running"));
```

## 3. Schema / resolver

- file tree
```
- graphql
    - resolvers.js
    - schema.graphql
- index.js

```

- resolvers.js
```js
const yourName = {
  name: "My Name",
  age: 15,
  gender: "male"
};

const resolvers = {
  
  Query: {
    person: () => yourName
  }
};

export default resolvers;

```

- schema.graphql

```js
type Query{
    person: YourName!
}
type YourName{
    name: String!
    age: Int!
    gender: String!
}
```

- index.js
```js
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});
server.start(() => console.log("GraphQl Server Running"));

```

- test (localhost:4000)

    - query
    ```js
    Query{
        person {
            name
            age
        }
    }
    ```
    - result
    ```js
    {
        "data": {
            "person": {
                "name": "My name",
                "age": 15
            }
        }
    }
    ```

## 3. graphql list get by person id

- file tree
```
- graphql
    - db.js
    - resolvers.js
    - schema.graphql
- index.js
```
- db.js
```js
export const people = [
  {
    id: "1",
    name: "Jonghyeok",
    age: 15,
    gender: "male"
  },
  { id: "2", name: "Henry", age: 20, gender: "male" },
  { id: "3", name: "Jeniffer", age: 19, gender: "female" },
  { id: "4", name: "Suhyeon", age: 26, gender: "female" },
  { id: "5", name: "Jinsoo", age: 30, gender: "male" },
  { id: "6", name: "Chrstie", age: 29, gender: "female" },
  { id: "7", name: "Charles", age: 32, gender: "male" }
];

// get by id
const getById = id => {
  const filteredPerson = people.filter(person => id === person.id);
  return filteredPerson[0];
};

```
- resolver.js
```js
import { people, getById } from "./db";

const resolvers = {
  Query: {
    people: () => people,
    person: () => getById()
  }
};

export default resolvers;


```

- schema.graphql
```js
type Person{
    id: Int!
    name: String!
    age: Int!
    gender: String!
}

type Query{
    people: [Person]!
    person(id: Int!): Person
}

```

- index.js

```js
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});
server.start(() => console.log("GraphQl Server Running"));

```

- server (localhost:4000)

    - (request) get people by name and id
    ```js
    query{
        people{
            name
            id
        }
    }
    ```
    - (response) people and their name and id
    ```js
    {
        "data": {
            "people": [
            {
                "name": "Jonghyeok",
                "id": 1
            },
            {
                "name": "Henry",
                "id": 2
            },
            {
                "name": "Jeniffer",
                "id": 3
            },
            {
                "name": "Suhyeon",
                "id": 4
            },
            {
                "name": "Jinsoo",
                "id": 5
            },
            {
                "name": "Chrstie",
                "id": 6
            },
            {
                "name": "Charles",
                "id": 7
            }
            ]
        }
    }

    ```

    - get person info by id (request)
    ```js
    query{
        person(id:1){
            name
            id
        }
    }
    ```
    - person info by id (response)
    ```js
    {
    "data": {
        "person": {
            "name": "Jonghyeok",
            "id": 1
            }
        }
    }
    ```

## 4. movie - Mutation

1. db.js - movies

```js
export const movies = [
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
  if (movies.lenght > cleanedMovies.length) {
    movie = cleanedMovies;
    return true;
  } else {
    return false;
  }
};

export const addMovie = (name, score) => {
  const newMovie = {
    id: movies.length + 1,
    name,
    score
  };
  movies.push(newMovie);
  return newMovie;
};

```

2. schema.graphql
```ts
type Movie{
    id: Int!
    name: String!
    score: Int!
}


type Query{
    movies: [Movie]!
    movie(id: Int!): Movie
    
}

type Mutation {
    addMovie(name: String!, score: Int!): Movie!
    deleteMovie(id: Int!): Boolean!
}
```

3. resolvers

```js
import { getMovies, getById, addMovie } from "./db";

const resolvers = {
  Query: {
    movies: () => getMovies(),
    movie: (_, { id }) => getById(id)
  },
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score),
    deleteMovie: (_, {id}) => deleteMovie(id)
  }
};

export default resolvers;

```

4.  (localhost:4000)
    - (request) add movie 
    ```js
    mutation{
        addMovie(name: "funnName", score:9){
            name
        }
    }
    ```

    - (response) add movie return
    ```js
    {
    "data": {
        "addMovie": {
                "name": "funnName"
            }
        }
    }
    ```

    -  result : data added 
    
    ```js
    {
        "data": {
            "movies": [
                {
                    "name": "Star Wars - 1",
                    "id": 0
                },
                {
                    "name": "Avengers - 1",
                    "id": 1
                },
                {
                    "name": "The Godfather - 1",
                    "id": 2
                },
                {
                    "name": "train to busan",
                    "id": 3
                },
                {
                    "name": "funnName",
                    "id": 5
                }
            ]
        }
    }
    ```

    - (request) delete movie

    ```js
    mutation{
        deleteMovie(id:0){
            name
        }
    }
    ```
    - (response) delete movie return
    ```js
    {
        "data": {
            "deleteMovie": true
        }
    }
    ```

    - result : movie deleted
    
    ```js
    {
        "data": {
            "movies": [
                
                {
                    "name": "Avengers - 1",
                    "id": 1
                },
                {
                    "name": "The Godfather - 1",
                    "id": 2
                },
                {
                    "name": "train to busan",
                    "id": 3
                },
                {
                    "name": "funnName",
                    "id": 5
                }
            ]
        }
    }
    ```

## 5. use data from REST API ( with fetch)
- add fetch
```cmd
foo@bar:/path$ yarn add node-fetch
```

0. file tree
```
- graphql
    - db.js
    - resolver.js
    - schema.graphql
- index.js
```


1. db.js

```js
import fetch from "node-fetch";
// movie website
const API_URL = "https://yts.lt/api/v2/list_movies.json?";
export const getMovies = (limit, rating) => {
  let REQUEST_URL = API_URL;
  if (limit > 0) {
    REQUEST_URL += `limit=${limit}`;
  }
  if (rating > 0) {
    REQUEST_URL += `&minimum_rating=${rating}`;
  }
  return fetch(REQUEST_URL)
    .then(res => res.json())
    .then(json => json.data.movies);
};

```
2. resolvers.js
```js
import { getMovies } from "./db";

const resolvers = {
  Query: {
    movies: (_, { rating, limit }) => getMovies(limit, rating)
  }
};

export default resolvers;

```

3. schema.graphql

```ts
type Movie{
    id: Int!
    title: String!
    rating: Float!
    summary: String
    language: String
    medium_cover_image: String
}


type Query{
    movies(limit: Int, rating:Float): [Movie]!
    
}
```

- result
    - ping
    ```js
    query{
        movies(rating:8.5, limit:40){
            title
            rating
            medium_cover_image
        }
    }
    ```
    - pong
    ```js
    {
    "data": {
        "movies": [
        {
            "title": "Marriage Story",
            "rating": 8.5,
            "medium_cover_image": "https://yts.lt/assets/images/movies/marriage_story_2019/medium-cover.jpg"
        },
        ...
    }
    ```


## 6. wrapping REST( with axios)
- add axios
```
yarn add axios
```
0. file tree

```
graphql
    - db.js
    - resolvers.js
    - schema.graphql
- index.js
```
1. db.js
```js
import axios from "axios";
const BASE_URL = "https://yts.lt/api/v2/";
const LIST_MOVIES_URL = `${BASE_URL}list_movies.json?`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json?`;
const MOVIE_SUGGESTIONS_URL = `${BASE_URL}movie_suggestions.json?`;

export const getMovies = async (limit, rating) => {
  const {
    data: {
      data: { movies }
    }
  } = await axios(LIST_MOVIES_URL, {
    params: {
      limit,
      minimum_rating: rating
    }
  });
  return movies;
};

export const getMovie = async id => {
  const {
    data: {
      data: { movie }
    }
  } = await axios(MOVIE_DETAILS_URL, {
    params: {
      movie_id: id
    }
  });
  return movie;
};

export const getSuggestions = async id => {
  const {
    data: {
      data: { movies }
    }
  } = await axios(MOVIE_SUGGESTIONS_URL, {
    params: {
      movie_id: id
    }
  });
  return movies;
};

```

3. schema.graphql
```ts

type Movie{
    id: Int!
    title: String!
    
    title_long: String!
    genres: [String]
    rating: Float!
    summary: String
    language: String
    medium_cover_image: String
    description_intro: String!
    

}


type Query{
    movies(limit: Int, rating:Float): [Movie]!
    movie(id: Int): Movie
    suggestions(id: Int): [Movie]
}

```
