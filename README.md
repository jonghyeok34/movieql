# movieql
Movie API with Graphql


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

- REST - problems ( overfetch/ underfetch)
```
[overfetch] - one query get unusing data, too

/users/ GET (profile info)  


[under fetch] - I have to call many url by query many url

/feed/
/notifications/
/user/1/
```

- GraphQl : get only what I want
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

return:

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

1. 		
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
```
{
    "presets": ["env", "stage-3"]
}

```
4. add babel sets to dev
```		
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

- files
```
- graphql
    - resolvers.js
    - schema.graphql
- index.js

```

- resolvers.js
```js
const jonghyeok = {
  name: "Jonghyeok",
  age: 15,
  gender: "male"
};

const resolvers = {
  
  Query: {
    person: () => jonghyeok
  }
};

export default resolvers;

```

- schema.graphql

```js
type Query{
    person: Jonghyeok!
}
type Jonghyeok{
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
                "name": "Jonghyeok",
                "age": 15
            }
        }
    }
    ```