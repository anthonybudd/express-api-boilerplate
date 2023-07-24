# Express API Boilerplate
A very simple REST API boilerplate using Express.js, Sequelize and MySQL. 

This is the boilerplate I start with whenever I build a SAAS application. This codebase has been used in multiple projects that generate over $10M per year.

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

# Optional
# Find & Replace (case-sensaive, whole repo): "express-api" => "your-api-name" 

# Start the app
docker compose up
npm run _db:refresh
npm run _test
```

### Routes
| Method      | Route                                                    | Description                           | Payload                               | Response          | 
| ----------- | -------------------------------------------------------- | ------------------------------------- | ------------------------------------- | ----------------- |  
| **DevOps**  |                                                          |                                       |                                       |                   |  
| GET         | `/_readiness`                                            | Kuber readiness check                 | --                                    | "healthy"         |  
| GET         | `/api/v1/_healthcheck`                                   | Returns {status: 'ok'} if healthy     | --                                    | {status: 'ok'}    |  
| **Auth**    |                                                          |                                       |                                       |                   |  
| POST        | `/api/v1/auth/login`                                     | Login                                 | {email, password}                     | {accessToken}     |  
| POST        | `/api/v1/auth/sign-up`                                   | Sign-up                               | {email, password, firstName, tos}     | {accessToken}     |  
| POST        | `/api/v1/auth/forgot`                                    | Forgot                                | {email}                               | {success: true}   |  
| GET         | `/api/v1/auth/get-user-by-reset-key/:passwordResetKey`   | Get user for given `passwordResetKey` | --                                    | {id, email}       |  
| POST        | `/api/v1/auth/reset`                                     | Reset Password                        | {email, password, passwordResetKey}   | {accessToken}     |  
| GET         | `/api/v1/auth/get-user-by-invite-key/:inviteKey`         | Get user for given `inviteKey`        | --                                    | {id, email}       |  
| POST        | `/api/v1/auth/invite`                                    | Complete user invite process          | {inviteKey, email, password, ...}     | {accessToken}     |  
| GET         | `/api/v1/_authcheck`                                     | Returns {auth: true} if has auth      | --                                    | {auth: true}      |  
| **Groups**  |                                                          |                                       |                                       |                   |  
| GET         | `/api/v1/groups/:groupID`                                | Returns group by ID                   | --                                    | {Group}           |  
| POST        | `/api/v1/groups/:groupID`                                | Update group by ID                    | {name: 'New Name'}                    | {Group}           |  
| POST        | `/api/v1/groups/:groupID/users/invite`                   | Invite user to group                  | {email}                               | {UserID, GroupID} |  
| DELETE      | `/api/v1/groups/:groupID/users/:userID`                  | Remove user from group                | --                                    | {UserID}          |  
| **User**    |                                                          |                                       |                                       |                   |  
| GET         | `/api/v1/user`                                           | Get the current user                  |                                       | {User}            |  
| POST        | `/api/v1/user`                                           | Update the current user               | {firstName, lastName}                 | {User}            |  
| POST        | `/api/v1/user/update-password`                           | Update password                       | {password, newPassword}               | {success: true}   |  


### Commands
| Command            | Description                   | Exmaple                          | 
| ------------------ | ----------------------------- | -------------------------------- |
| jwt                | Generate JWT for a user       | `docker exec -ti express-api node ./src/scripts/jwt.js --userID="c4644733-deea-47d8-b35a-86f30ff9618e"` |
| forgotPassword     | Generate password reset link  | `docker exec -ti express-api node ./src/scripts/forgotPassword.js --userID="c4644733-deea-47d8-b35a-86f30ff9618e"` |
| resetPassword      | Password user password        | `docker exec -ti express-api node ./src/scripts/resetPassword.js --userID="c4644733-deea-47d8-b35a-86f30ff9618e" --password="password"` |
| inviteUser         | Invite user to group          | `docker exec -ti express-api node ./src/scripts/inviteUser.js --email="newuser@example.com" --groupID="fdab7a99-2c38-444b-bcb3-f7cef61c275b"` |
