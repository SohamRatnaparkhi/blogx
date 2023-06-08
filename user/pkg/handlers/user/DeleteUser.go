package users

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/user/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/utils"
)

func DeleteUser(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	user_uuid := user.ID
	http.SetCookie(w, &http.Cookie{
		Name:  "auth_token",
		Value: "",
		Path:  "/",
	})

	err := apiConfig.DeleteUser(req.Context(), user_uuid)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusNoContent, struct{}{})
}
