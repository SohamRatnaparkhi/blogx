package users

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/user/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/utils"
)

func GetUserByID(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	user, err := apiConfig.GetUserByID(req.Context(), user.ID)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, struct {
		Success string        `json:"success"`
		User    database.User `json:"user"`
	}{
		Success: "User fetched successfully",
		User:    user,
	})
}

func GetUserByEmail(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	user, err := apiConfig.GetUserByEmail(req.Context(), user.Email)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, struct {
		Success string        `json:"success"`
		User    database.User `json:"user"`
	}{
		Success: "User fetched successfully",
		User:    user,
	})
}
