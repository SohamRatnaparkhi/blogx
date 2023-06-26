package feed

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/db/redis"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/utils"
)

func AllPostNoPage(w http.ResponseWriter, req *http.Request, _ database.User) {
	redisClient, err := redis.GetRedisClient()
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	allBlogs, _ := redisClient.Get(req.Context(), "allBlogs").Result()
	if allBlogs != "" {
		//convert string to post
		var posts []database.Post
		json.Unmarshal([]byte(allBlogs), &posts)
		utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(posts))
		return
	}
	apiConfig := pkg.DbClient
	allPosts, err := apiConfig.GetAllPosts(req.Context())
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(allPosts))
}

func AllPostWithPage(w http.ResponseWriter, req *http.Request, _ database.User) {
	apiConfig := pkg.DbClient
	offset_string := req.URL.Query().Get("page_no")
	offset, typeCastError := strconv.Atoi(offset_string)
	if typeCastError != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, typeCastError)
		return
	}
	LIMIT := 5
	allPosts, err := apiConfig.GetAllPostsPageWise(req.Context(), database.GetAllPostsPageWiseParams{
		Limit:  int32(LIMIT),
		Offset: int32(offset-1) * 5,
	})
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(allPosts))
}
