-- name: CreatePost :one

INSERT into
    posts (id, user_id, title, body, tags)
VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: UpdatePost :one

UPDATE posts
SET
    title = $2,
    body = $3,
    tags = $4
WHERE id = $1 RETURNING *;

-- name: DeletePost :exec

DELETE FROM posts WHERE id = $1;