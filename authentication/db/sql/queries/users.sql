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
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;

-- name: GetUserByEmail :one

SELECT * FROM users WHERE email = $1;

-- name: DeleteUser :exec

DELETE FROM users WHERE id = $1;