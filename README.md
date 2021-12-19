# server
### This is a backend for a Business services website
### The website that supports a business but does not produce a tangible good.

## User Stories
- Registration: As An Anonymous User, I Can Register On The Website So That I Can Use Features On The Website.
- Login: As A User, I Can Log Into The Website So That I Can Use All Features On The Website.
- Logout: As A User, I Can Log Out Of The Website So That No One Else Can Use It.
- As A User, I Want To Add Post  To My Profile  Contains Information About My Business Or Services.
- As A User, I Want To  See Users' Posts, Comment And Communicate With Them By Clicking The Action Floating Button .
- As A User, I Want To See All The Post Details On The Home Screen .
- As A User, I Want To Edit My Posts .
- As A User, I Want To Delete Posts Or Comments So That If Decide It's Not Necessary.
- Edit User Profile As A User I Can Edit My Profile, Add, Delete Or Update My Account.
## Admin Stories
- As An Admin, I Can See All Users Profile And All Content Of The Website What The User Published.
- As An Admin,  I Can Delete Users And What Is Added By The User On The Website.
- As An Admin, I Can Update The Contents Of The Website.

## Models
### User Model

Key |type   |   options                              | default value
------------- | -----------  | ---------------------------           |----------------------
email         | String   |required, unique                      |N/A
username        |  String    |required                         |N/A
password        | String   |required                                            |N/A
isDeleted       | Boolean   |                     |N/A
resetLink       | String   |                    |N/A
avatar       |  String    |                       |N/A
role         | mongoose.Schema   |                 |N/A
isconfirme       | type: Boolean  |                 |N/A
### Role Model

Key |type   |   options                              | default value
------------- | -----------  | ---------------------------           |----------------------
 role        | String   |required                   |N/A
permissions      | Array    |required                         |N/A
###  Post Model

Key |type   |   options                              | default value
------------- | -----------  | ---------------------------           |----------------------
image      | String   |                   |N/A
description        |  String    |required                         |N/A
user      |  mongoose.Schema    |                                          |N/A
isDeleted       | Boolean   |                     |N/A

### Comment Model

Key |type   |   options                              | default value
------------- | -----------  | ---------------------------           |----------------------
text     | String   | required                    |N/A
isDeleted |  Boolean    |                       |N/A
user      |  mongoose.Schema    |                                          |N/A
post       | mongoose.Schema   |                     |N/A

## Backend routes
## Router Routes
HTTP Method  | authorize    |   Path                               | Request Body
------------- | -----------  | ---------------------------           |----------------------
POST         | public     |`/user/create`                         |{email, password, role}
POST         | public    |`/user/log`                            |{email, password}
GET          | admin only   |`/user/`                               |
DELETE       | admin only   |`/user/`                               |
GET          | public   |`/user/verifyemail/:email/:token`     |
PUT          | public     |`/user/forgetPassword`                 |{email}
PUT          | public    |`/user/resetPassword`                  |{resetLink, newPassword}
GET          | user+admin   |`/user/:_id”`                          |
POST         | public    |`/user/googlelogin`                    |{idToken}
POST         | admin + user |`/comment/create`                      |{text,user,Post}
PUT          | admin + user |`/comment/update`                      |{id, text}
DELETE       | admin + user |`/comment/delete/:_id`                 |
GET          | admin + user |`/posts/`                              |
GET          | admin + user |`/posts/userPost/:postedBy`            |
GET          | admin + user |`/posts/onePost/:_id`                  |
POST         | admin + user |`/posts/create`                        |{image, description, post}
PUT          | admin + user |`/posts/archivePost/:_id`              |{id}
DELETE       | admin + user |`/posts/delete/:_id`                   |
PUT          | admin + user |`/posts/update`                        |{id, newdescribe}

##  Entity Relationship Diagram
![ ](https://github.com/MP-Project-Thoraya/server/blob/main/erd.png)

## UML Diagram
![ ](https://github.com/MP-Project-Thoraya/server/blob/main/Uml.png)


## Getting Started
### Installation Packages
#### 1-Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- npm install express --save
#### 2-Install CORS middleware that can be used to enable CORS with various options .
- npm i cors
#### 3-Install dotenv to create secret keys that your application needs 
- npm i dotenv
#### 4-mongoose is an elegant mongodb object modeling for node.js.
-  npm install mongoose --save
#### 5-morgan is a HTTP request logger middleware for node.js.
- npm i morgan
#### 6-bcrypt is a A library to help you hash passwords.
- npm install bcrypt
#### 7-jsonwebtoken is a JSON Web Token implementation (symmetric and asymmetric).
- npm install jsonwebtoken
#### 8-passport-google-oauth20 Passport strategy for authenticating with Google using the OAuth 2.0 API.
- nmp i passport-google-oauth20

