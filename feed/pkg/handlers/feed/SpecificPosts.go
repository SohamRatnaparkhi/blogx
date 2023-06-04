package feed

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/utils"
)

func PostsOfUsersIFollow(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	posts, err := apiConfig.GetPostsOfFollowers(req.Context(), user.ID)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(posts))
}

func PostsILiked(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	posts, err := apiConfig.GetAllLikedPosts(req.Context(), user.ID)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(posts))
}
