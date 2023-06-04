-- name: GetAllPosts :many

SELECT * FROM posts ORDER BY created_at, likes DESC;

-- name: GetAllPostsPageWise :many

SELECT *
FROM posts
ORDER BY
    created_at,
    likes DESC
LIMIT $1
OFFSET $2;

-- name: GetPostByPostId :one

SELECT * FROM posts WHERE id = $1;

-- name: GetPostsByUserId :many

SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC;

-- name: UpdatePostViews :one

UPDATE posts SET views = views + 1 WHERE id = $1 RETURNING *;

-- name: GetPostsByUserIdPageWise :many

SELECT *
FROM posts
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT $2
OFFSET $3;

-- name: GetPostsByTags :many

SELECT *
FROM posts
WHERE tags @> $1 :: varchar []
ORDER BY created_at DESC;

-- name: GetPostsOfFollowers :many

SELECT DISTINCT *
FROM posts
WHERE posts.user_id IN (
        SELECT following_id
        FROM user_followers
        WHERE follower_id = $1
    )
ORDER BY created_at DESC;

-- name: GetAllLikedPosts :many

SELECT *
FROM posts
WHERE id IN (
        SELECT post_id
        FROM user_likes
        WHERE
            user_likes.user_id = $1
    )
ORDER BY
    likes,
    created_at DESC;