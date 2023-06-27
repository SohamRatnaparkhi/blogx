package posts

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/db/redis"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/google/uuid"
)

// @title Create a post
// @version 1
// @description Create a post with title, body and tags given in the body
// @Tags posts
// @accept json
// @produce json
// @param data body database.CreatePostParams true "Post details"
// @success 201 {object} utils.PostMap
// @failure 400 {object} string
// @failure 500 {object} string
// @router /blogs/addBlog [post]
func CreatePostHandler(w http.ResponseWriter, req *http.Request, user database.User) {
	type reqBody struct {
		Title string
		Body  string
		Tags  []string
	}
	decoder := json.NewDecoder(req.Body)

	bodyDecoded := reqBody{}

	if err := decoder.Decode(&bodyDecoded); err != nil {
		utils.ResponseJson(w, 400, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}

	redisClient, err := redis.GetRedisClient()
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	apiConfig := pkg.DbClient

	post, dbErr2 := apiConfig.CreatePost(req.Context(), database.CreatePostParams{
		ID:     uuid.New(),
		Title:  bodyDecoded.Title,
		Body:   bodyDecoded.Body,
		UserID: user.ID,
		Tags:   bodyDecoded.Tags,
	})

	if dbErr2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, dbErr2)
		return
	}

	allBlogs, _ := redisClient.Get(req.Context(), "allBlogs").Result()
	allBlogsJson, err := json.Marshal(&allBlogs)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	postJson, err := json.Marshal(&post)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	// append post to allBlogs
	allBlogsJson = append(allBlogsJson, postJson...)
	redisClient.Set(req.Context(), "allBlogs", string(allBlogsJson), 180*time.Second)
	utils.ResponseJson(w, http.StatusOK, utils.MapPost(post))
}
