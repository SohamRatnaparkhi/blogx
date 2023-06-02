-- name: CreatePost :one

INSERT into
    posts (id, user_id, title, body, tags)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;