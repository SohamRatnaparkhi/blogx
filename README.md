# blogx-backend-go

Microservice based backend for a micro-blogging platform.

It offers four distinct API services that collectively enable various functionalities:

- **Authentication**: This service facilitates essential operations such as user `login`, `logout`, and `registration`, ensuring secure access to the platform.
- **Blog**: The Blog service provides features for managing blog-related activities. Users can `create`, `update`, and `delete` their blog posts. Additionally, they have the ability to `like` or `dislike` posts, promoting user engagement and feedback.
- **User**: This service focuses on user-related interactions. It allows users to `follow` or `unfollow` other users, enabling social connections within the platform. Furthermore, users can `delete` their account if desired.
- **Feed**: The Feed service is responsible for curating and displaying relevant content to users. It offers multiple options for customizing the feed, including displaying `all posts`, posts from `followed` authors, `liked` posts, posts by a specific user, or a `particular post`.
- **Swagger -** You can access the Swagger UI at `localhost:8084/swagger/index.html`

Try this API service in postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25118959-d0fe8b6b-4aac-46af-b5b1-b557f0be7064?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25118959-d0fe8b6b-4aac-46af-b5b1-b557f0be7064%26entityType%3Dcollection%26workspaceId%3D572f4781-b67c-48e3-ae06-4fb3efc89053)

## Local setup

### Code-base Setup

1. Each folder of the root directory in the codebase contains an `.env.example` file. Follow the steps below to set up the necessary environment variables:

* Create a file named .env in each folder.
* Open the `.env.example` file and copy its contents.
* Paste the copied contents into the corresponding `.env` file.
* Replace the placeholder values in the .env file with the suggested values provided in the `.env.example` file.

2. To set up the service locally, follow the steps below:

* Clone the repository to your local machine.
* Open a terminal and navigate to the cloned repository.
* Create a network using the command `docker network create my-network`
* Run the command `docker compose up`.

> **Note**: The `docker compose up` command will automatically set up the database. However, if it fails, please refer to the "*DB-Setup*" section for further instructions.

### DB-Setup

After running `docker compose up`, perform the following steps:

1. Open a new terminal window.
2. Execute the command `docker exec -it db bash`.
3. Run the command `psql -U postgres` to access the PostgreSQL command-line interface.
4. Create a new database by executing the command `CREATE DATABASE blogx_db;`.
5. Connect to the newly created database by executing the command `\c blogx_db`.
6. Open the `init.sql` file located in the `\db` folder.
7. Copy the contents of the `init.sql` file.
8. Paste the copied contents into the terminal where the PostgreSQL command-line interface is running.
9. Press Enter to execute the commands and initialize the database.

By following these steps, you should be able to set up the local environment and initialize the necessary database for the service.

## Authentication service

| endpoint  | method | success status<br />code | auth token<br />requirement |
| --------- | ------ | ------------------------ | --------------------------- |
| /         | GET    | 200                      | NO                          |
| /register | POST   | 201                      | NO                          |
| /login    | POST   | 200                      | NO                          |
| /logout   | POST   | 202                      | YES                         |

---

## Blog service

| endpoint          | endpoint | success status<br />code | auth token<br />requirement |
| ----------------- | -------- | ------------------------ | --------------------------- |
| /                 | GET      | 200                      | NO                          |
| /addBlog          | POST     | 200                      | YES                         |
| /updateBlog       | PATCH    | 200                      | YES                         |
| /deleteBlog       | DELETE   | 204                      | YES                         |
| /like?post_id=    | GET      | 200                      | YES                         |
| /dislike?post_id= | GET      | 200                      | YES                         |

---

## Feed service

| endpoint                   | method | success status<br />code | auth token<br />requirement |
| -------------------------- | ------ | ------------------------ | --------------------------- |
| /                          | GET    | 200                      | NO                          |
| /allPosts                  | GET    | 200                      | YES                         |
| /allPostsPageWise?page_no= | GET    | 200                      | YES                         |
| /postWithId?post_id=       | GET    | 200                      | YES                         |
| /postWithUserId?user_id=   | GET    | 200                      | YES                         |
| /myPosts                   | GET    | 200                      | YES                         |
| /followingUsersPosts       | GET    | 200                      | YES                         |
| /myLikedPosts              | GET    | 200                      | YES                         |

---

## User service

| endpoint                | method | success status<br />code | auth token<br />requirement |
| ----------------------- | ------ | ------------------------ | --------------------------- |
| /                       | GET    | 200                      | NO                          |
| /delete                 | DELETE | 204                      | YES                         |
| /follow?toFollowId=     | POST   | 200                      | YES                         |
| /unfollow?toUnfollowId= | POST   | 200                      | YES                         |

---

> As this is the first version of this backend, each service endpoint is preceded by `/v1/api`

---

## Database

Database used - PostgreSQL

### Schema

![image](https://github.com/SohamRatnaparkhi/blogx-backend-go/assets/92905626/8cda3809-23ab-498a-a9ac-4572638d9cfd)
[Database-diagram](https://drawsql.app/teams/soham-ratnaparkhi/diagrams/blog-app)

## Description

| Table name     | Description                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| users          | Stores the details of users. The password is not stored directly; it is hashed for security purposes. |
| posts          | Stores the blog posts created by users.                                                               |
| user_followers | Represents the relationship between users, where the `follower_id` follows the `following_id`.    |
| user_likes     | Records the likes given by users (user_id) to specific posts (post_id).                               |

## Tools and Technologies used

1. Go
2. PostgreSQL
3. Redis
4. Docker and Docker-compose
5. HAProxy (load-balancer)
6. SwaggerUI
