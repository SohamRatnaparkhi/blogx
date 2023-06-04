package feed

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/utils"
	"github.com/google/uuid"
)

func GetPostWithPostId(w http.ResponseWriter, req *http.Request, _ database.User) {
	apiConfig := pkg.DbClient
	post_id_string := req.URL.Query().Get("post_id")
	post_uuid, typeCastError := uuid.Parse(post_id_string)
	if typeCastError != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, typeCastError)
		return
	}
	_, err := apiConfig.GetPostByPostId(req.Context(), post_uuid)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	post, err2 := apiConfig.UpdatePostViews(req.Context(), post_uuid)
	if err2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err2)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapSinglePost(post))
}

func GetMyPosts(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	posts, err := apiConfig.GetPostsByUserId(req.Context(), user.ID)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(posts))
}

func GePostsByUserId(w http.ResponseWriter, req *http.Request, _ database.User) {
	apiConfig := pkg.DbClient
	user_id_string := req.URL.Query().Get("user_id")
	user_uuid, typeCastError := uuid.Parse(user_id_string)
	if typeCastError != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, typeCastError)
		return
	}
	posts, err := apiConfig.GetPostsByUserId(req.Context(), user_uuid)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, utils.MapAllPosts(posts))
}
