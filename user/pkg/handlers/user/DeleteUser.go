package users

import (
	"net/http"
	"time"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/utils"
)

func DeleteUser(w http.ResponseWriter, req *http.Request, user database.User) {
	apiConfig := pkg.DbClient
	user_uuid := user.ID
	req2, logoutErr := http.NewRequest(http.MethodPost, "http://localhost:8080/v1/api/auth/logout", nil)
	if logoutErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, logoutErr)
		return
	}
	req2.Header.Set("Content-Type", "application/json")
	client := http.Client{
		Timeout: 10 * time.Second,
	}
	_, reqErr := client.Do(req2)
	if reqErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, reqErr)
		return
	}
	err := apiConfig.DeleteUser(req.Context(), user_uuid)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}
	utils.ResponseJson(w, http.StatusNoContent, struct{}{})
}
