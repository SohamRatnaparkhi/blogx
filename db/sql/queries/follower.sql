-- name: FollowUser :one

INSERT into
    user_followers (user_id, follower_id)
VALUES ($1, $2) ON CONFLICT (user_id, follower_id)
DO NOTHING
RETURNING *;

-- name: UnfollowUser :one

DELETE FROM user_followers
WHERE
    user_id = $1
    AND follower_id = $2
RETURNING *;