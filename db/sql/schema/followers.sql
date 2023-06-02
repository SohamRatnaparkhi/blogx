CREATE TABLE
    user_followers (
        user_id UUID NOT NULL,
        follower_id UUID NOT NULL,
        PRIMARY KEY(user_id, follower_id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(follower_id) REFERENCES users(id) ON DELETE CASCADE
    );