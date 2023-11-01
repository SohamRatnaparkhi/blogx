package users

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/user/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/utils"
)

func UpdateUserBio(w http.ResponseWriter, req *http.Request, user database.User) {
	type reqBody struct {
		Bio sql.NullString `json:"bio"`
	}
	decoder := json.NewDecoder(req.Body)
	reqBodyDecoded := reqBody{}
	if err := decoder.Decode(&reqBodyDecoded); err != nil {
		utils.ResponseJson(w, 400, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}
	apiConfig := pkg.DbClient
	err := apiConfig.UpdateUserBio(req.Context(), reqBodyDecoded.Bio, user.ID)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, struct {
		Success string `json:"success"`
	}{
		Success: "Bio updated successfully",
	})
}

func UpdateUserPassword(w http.ResponseWriter, req *http.Request, user database.User) {
	type reqBody struct {
		Password string `json:"password"`
		Email    string `json:"email"`
	}
	decoder := json.NewDecoder(req.Body)
	reqBodyDecoded := reqBody{}
	if err := decoder.Decode(&reqBodyDecoded); err != nil {
		utils.ResponseJson(w, 400, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}
	apiConfig := pkg.DbClient
	err := apiConfig.UpdateUserPassword(req.Context(), reqBodyDecoded.Password, user.ID, reqBodyDecoded.Email)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusOK, struct {
		Success string `json:"success"`
	}{
		Success: "Password updated successfully",
	})
}
