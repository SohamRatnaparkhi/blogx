# blogx-backend-go

Microservice based backend for a micro-blogging platform.

It has 4 services:

1. Authentication
2. blog
3. feed
4. user

Click below to run this API service in postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25118959-d0fe8b6b-4aac-46af-b5b1-b557f0be7064?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25118959-d0fe8b6b-4aac-46af-b5b1-b557f0be7064%26entityType%3Dcollection%26workspaceId%3D572f4781-b67c-48e3-ae06-4fb3efc89053)

## Authentication service

| endpoint  | method | success status<br />code | auth token<br />requirement |
| --------- | ------ | ------------------------ | --------------------------- |
| /         | GET    | 200                      | NO                          |
| /register | POST   | 201                      | NO                          |
| /login    | POST   | 200                      | NO                          |
| /logout   | POST   | 202                      | YES                         |

---

## User service

| endpoint              | method | success status<br />code | auth token<br />requirement |
| --------------------- | ------ | ------------------------ | --------------------------- |
| /                     | GET    | 200                      | NO                          |
| /delete               | DELETE | 204                      | YES                         |
| /follow?toFollowId=   | POST   | 200                      | YES                         |
| /unfollow?toFollowId= | POST   | 200                      | YES                         |
