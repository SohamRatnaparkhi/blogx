package redis

import (
	"errors"

	"github.com/redis/go-redis/v9"
)

func GetRedisClient() (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	if client == nil {
		return nil, errors.New("failed to connect to redis")
	}
	return client, nil
}
