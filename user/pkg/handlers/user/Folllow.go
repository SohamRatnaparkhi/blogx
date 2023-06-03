package users

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/utils"
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/google/uuid"
)

func FollowUser(w http.ResponseWriter, req *http.Request, user database.User) {
	uuid_param := req.URL.Query().Get("toFollowId")
	uuid, paramParseErr := uuid.Parse(uuid_param)
	if paramParseErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, paramParseErr)
		return
	}
	apiConfig := pkg.DbClient
	userFollowTuple, followerUpdateErr := apiConfig.FollowUser(req.Context(), database.FollowUserParams{
		UserID:     user.ID,
		FollowerID: uuid,
	})
	if followerUpdateErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, followerUpdateErr)
		return
	}
	utils.ResponseJson(w, http.StatusOK, userFollowTuple)
}

func UnFollowUser(w http.ResponseWriter, req *http.Request, user database.User) {
	uuid_param := req.URL.Query().Get("toFollowId")
	uuid, paramParseErr := uuid.Parse(uuid_param)
	if paramParseErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, paramParseErr)
		return
	}
	apiConfig := pkg.DbClient
	userFollowTuple, followerUpdateErr := apiConfig.UnfollowUser(req.Context(), database.UnfollowUserParams{
		UserID:     user.ID,
		FollowerID: uuid,
	})
	if followerUpdateErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, followerUpdateErr)
		return
	}
	utils.ResponseJson(w, http.StatusOK, userFollowTuple)
}
