package users

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/utils"
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
		FollowingID: uuid,
		FollowerID:  user.ID,
	})
	if followerUpdateErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, followerUpdateErr)
		return
	}
	utils.ResponseJson(w, http.StatusOK, userFollowTuple)
}

func UnFollowUser(w http.ResponseWriter, req *http.Request, user database.User) {
	uuid_param := req.URL.Query().Get("toUnfollowId")
	uuid, paramParseErr := uuid.Parse(uuid_param)
	if paramParseErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, paramParseErr)
		return
	}
	apiConfig := pkg.DbClient
	userFollowTuple, followerUpdateErr := apiConfig.UnfollowUser(req.Context(), database.UnfollowUserParams{
		FollowingID: uuid,
		FollowerID:  user.ID,
	})
	if followerUpdateErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, followerUpdateErr)
		return
	}
	utils.ResponseJson(w, http.StatusOK, userFollowTuple)
}
