package posts

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/google/uuid"
)

func HandlePostLike(w http.ResponseWriter, req *http.Request, user database.User) {
	post_id_string := req.URL.Query().Get("post_id")
	post_uuid, typeCastError := uuid.Parse(post_id_string)
	if typeCastError != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, typeCastError)
		return
	}
	apiConfig := pkg.DbClient
	_, err := apiConfig.LikePost(req.Context(), database.LikePostParams{
		UserID: user.ID,
		PostID: post_uuid,
	})
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	post, err2 := apiConfig.IncreasePostLikes(req.Context(), post_uuid)
	if err2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, post)
}
func HandlePostDislike(w http.ResponseWriter, req *http.Request, user database.User) {
	post_id_string := req.URL.Query().Get("post_id")
	post_uuid, typeCastError := uuid.Parse(post_id_string)
	if typeCastError != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, typeCastError)
		return
	}
	apiConfig := pkg.DbClient
	_, err := apiConfig.DisLikePost(req.Context(), database.DisLikePostParams{
		UserID: user.ID,
		PostID: post_uuid,
	})
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	post, err2 := apiConfig.DecreasePostLikes(req.Context(), post_uuid)
	if err2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, post)
}
