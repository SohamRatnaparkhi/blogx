-- name: CreateUser :one

INSERT INTO
    users (
        id,
        first_name,
        last_name,
        password,
        email,
        bio
    )
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: UpdateUser :one

UPDATE
    users (
        first_name,
        last_name,
        password,
        email,
        bio
    )
SET ($2, $3, $4, $5, $6)
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec

DELETE FROM users WHERE id = $1;