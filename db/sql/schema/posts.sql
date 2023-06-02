CREATE TABLE
    posts (
        id UUID NOT NULL,
        user_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        PRIMARY KEY(id),
        likes INT NOT NULL DEFAULT 0,
        view INT NOT NULL DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );