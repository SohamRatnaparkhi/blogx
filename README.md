# blogx-backend-go

Microservice based backend for a micro-blogging platform.

It offers four distinct API services that collectively enable various functionalities:

- Authentication: This service facilitates essential operations such as user `login`, `logout`, and `registration`, ensuring secure access to the platform.

- Blog: The Blog service provides features for managing blog-related activities. Users can `create`, `update`, and `delete` their blog posts. Additionally, they have the ability to `like` or `dislike` posts, promoting user engagement and feedback.

- User: This service focuses on user-related interactions. It allows users to `follow` or `unfollow` other users, enabling social connections within the platform. Furthermore, users can `delete` their account if desired.

- Feed: The Feed service is responsible for curating and displaying relevant content to users. It offers multiple options for customizing the feed, including displaying `all posts`, posts from `followed` authors, `liked` posts, posts by a specific user, or a `particular post`.



Try this API service in postman. 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25118959-d0fe8b6b-4aac-46af-b5b1-b557f0be7064?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25118959-d0fe8b6b-4aac-46af-b5b1-b557f0be7064%26entityType%3Dcollection%26workspaceId%3D572f4781-b67c-48e3-ae06-4fb3efc89053)

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
| /postWithUserId?user_id=  | GET    | 200                      | YES                         |
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

## Schema

![image](https://github.com/SohamRatnaparkhi/blogx-backend-go/assets/92905626/8cda3809-23ab-498a-a9ac-4572638d9cfd)
[Database-diagram](https://drawsql.app/teams/soham-ratnaparkhi/diagrams/blog-app)
