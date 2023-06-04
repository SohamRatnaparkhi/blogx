package users

import (
	"encoding/json"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg"
	"golang.org/x/crypto/bcrypt"

	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/utils"
)

func HandleLoginUser(w http.ResponseWriter, req *http.Request) {
	type ReqBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	decoder := json.NewDecoder(req.Body)
	body := ReqBody{}

	err := decoder.Decode(&body)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
	}

	apiConfig := pkg.DbClient

	user, err := apiConfig.GetUserByEmail(req.Context(), body.Email)

	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	authCheck := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if authCheck != nil {
		utils.ErrorResponse(w, http.StatusUnauthorized, authCheck)
		return
	}

	jwtToken, expiryTime, tokenErr := utils.GetJwt(utils.Credentials{
		Email: user.Email,
		Name:  user.FirstName + user.LastName,
	})

	if tokenErr != nil {
		utils.ErrorResponse(w, http.StatusForbidden, tokenErr)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "auth_token",
		Value:   jwtToken,
		Expires: expiryTime,
		Path:    "/",
	})

	// go utils.SendMail(user.Email, fmt.Sprintf("Some on logged in to your account at %v", time.Now()), "Login Verification")

	utils.ResponseJson(w, http.StatusOK, utils.MapLoginUser(user))
}
