package users

import (
	"fmt"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/utils"
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/google/uuid"
)

func DeleteUser(w http.ResponseWriter, req *http.Request, user database.User) {
	if !user.Isadmin {
		utils.ErrorResponse(w, http.StatusUnauthorized, fmt.Errorf("only admins can delete a user"))
	}
	apiConfig := pkg.DbClient
	user_id := req.URL.Query().Get("user_id")
	user_uuid, parseErr := uuid.Parse(user_id)
	if parseErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, parseErr)
	}
	err := apiConfig.DeleteUser(req.Context(), user_uuid)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
	}
	utils.ResponseJson(w, http.StatusNoContent, struct{}{})
}
