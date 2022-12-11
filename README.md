# Express API Boilerplate
A very simple REST API boilerplate using Express.js, Sequelize and MySQL.

This project has been built using lessons learnt from over 5 years of building production REST APIs and has generated in excess of $10 million in revenue. 

This project is designed to work with [AnthonyBudd/Vuetify-SPA-Boilerplate](https://github.com/anthonybudd/Vuetify-SPA-boilerplate)

### Set-up
```sh
git clone git@github.com:anthonybudd/express-api-boilerplate.git
cd express-api-boilerplate
cp .env.example .env
npm install

# Private RSA key for JWT signing
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

# Start the app
docker compose up
npm run _db:refresh
npm run _test
```

### Routes
| Method      | Route                                       | Description                           | Payload                    | Response         | 
| ----------- | ------------------------------------------- | ------------------------------------- | -------------------------- | ---------------- |  
| **DevOps**  |                                             |                                       |                            |                  |  
| GET         | `/_readiness`                               | Kuber readiness check                 | --                         | "healthy"        |  
| GET         | `/api/v1/_healthcheck`                      | Returns {status: 'ok'} if healthy     | --                         | {status: 'ok'}   |  
| **Auth**    |                                             |                                       |                            |                  |  
| POST        | `/api/v1/auth/login`                        | Login                                 | {email,  password}         | {accessToken}    |  
| POST        | `/api/v1/auth/sign-up`                      | Sign-up                               | {email, password}          | {accessToken}    |  
| GET         | `/api/v1/_authcheck`                        | Returns {auth: true} if has auth      | --                         | {auth: true}     |  
| **Groups**  |                                             |                                       |                            |                  |  
| GET         | `/api/v1/groups/:groupID`                   | Returns group by ID                 | --                         | {Group}          |  
| POST        | `/api/v1/groups/:groupID`                   | Update group by ID                       | {name: 'New Name'}         | {Group}          |  
| POST        | `/api/v1/groups/:groupID/users/add`         | Add user to group                     | {userID: UUID}             | {UserID}         |  
| DELETE      | `/api/v1/groups/:groupID/users/:userID`     | Remove user from group                | --                         | {UserID}         |  
| **User**    |                                             |                                       |                            |                  |  
| GET         | `/api/v1/user`                              | Get the current user                  |                            | {User}           |  
| POST        | `/api/v1/user`                              | Update the current user               | {firstName, lastName}      | {User}           |  
| POST        | `/api/v1/user/update-password`              | Update password                       | {oldPassword, newPassword} | {success: true}  |  
