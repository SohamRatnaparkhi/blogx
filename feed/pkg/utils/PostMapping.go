package utils

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/google/uuid"
)

type PostMap struct {
	ID       uuid.UUID `json:"id"`
	Title    string    `json:"title"`
	Body     string    `json:"body"`
	AuthorID uuid.UUID `json:"author_id"`
	Tags     []string  `json:"tags"`
	Views    int32     `json:"views"`
	Likes    int32     `json:"likes"`
}

func MapSinglePost(post database.Post) PostMap {
	return PostMap{
		ID:       post.ID,
		Title:    post.Title,
		Body:     post.Body,
		AuthorID: post.UserID,
		Tags:     post.Tags,
		Views:    post.Views,
		Likes:    post.Likes,
	}
}

func MapAllPosts(posts []database.Post) []PostMap {
	var postMaps []PostMap
	for _, post := range posts {
		postMaps = append(postMaps, MapSinglePost(post))
	}
	return postMaps
}
