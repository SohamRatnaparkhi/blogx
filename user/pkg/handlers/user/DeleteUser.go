package users

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/utils"
	"github.com/google/uuid"
)

func DeleteUser(w http.ResponseWriter, req *http.Request, user database.User) {
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
