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

-- name: LikePost :one

INSERT INTO user_likes(user_id, post_id) VALUES($1, $2) RETURNING *;

-- name: DisLikePost :one

DELETE FROM user_likes
WHERE
    post_id = $1
    AND user_id = $2 RETURNING *;

-- name: IncreasePostLikes :one

UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;

-- name: DecreasePostLikes :one

UPDATE posts SET likes = likes - 1 WHERE id = $1 RETURNING *;