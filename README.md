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

## Problems solved by GraphQl

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
