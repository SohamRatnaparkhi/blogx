package posts

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
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
	tuple, err := apiConfig.LikePost(req.Context(), database.LikePostParams{
		UserID: user.ID,
		PostID: post_uuid,
	})
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, tuple)
}
func HandlePostDislike(w http.ResponseWriter, req *http.Request, user database.User) {
	post_id_string := req.URL.Query().Get("post_id")
	post_uuid, typeCastError := uuid.Parse(post_id_string)
	if typeCastError != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, typeCastError)
		return
	}
	apiConfig := pkg.DbClient
	tuple, err := apiConfig.DisLikePost(req.Context(), database.DisLikePostParams{
		UserID: user.ID,
		PostID: post_uuid,
	})
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, tuple)
}
