CREATE TABLE
    user_followers (
        follower_id UUID NOT NULL,
        following_id UUID NOT NULL,
        PRIMARY KEY(following_id, follower_id),
        FOREIGN KEY(follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(follower_id) REFERENCES users(id) ON DELETE CASCADE
    );