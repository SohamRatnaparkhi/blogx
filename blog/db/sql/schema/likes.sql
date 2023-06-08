CREATE TABLE
    user_likes (
        user_id UUID NOT NULL,
        post_id UUID NOT NULL,
        PRIMARY KEY(user_id, post_id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );