
CREATE TABLE
    users (
        id UUID NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        bio text,
        password TEXT NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    posts (
        id UUID NOT NULL,
        user_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        PRIMARY KEY(id),
        likes INT NOT NULL DEFAULT 0,
        views INT NOT NULL DEFAULT 0,
        tags text [] NOT NULL DEFAULT '{}',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    user_followers (
        follower_id UUID NOT NULL,
        following_id UUID NOT NULL,
        PRIMARY KEY(following_id, follower_id),
        FOREIGN KEY(follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(follower_id) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE TABLE
    user_likes (
        user_id UUID NOT NULL,
        post_id UUID NOT NULL,
        PRIMARY KEY(user_id, post_id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );