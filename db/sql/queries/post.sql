-- name: CreatePost :one

INSERT into
    posts (id, user_id, title, body,)
VALUES ($1, $2, $3, $4)
RETURNING *;