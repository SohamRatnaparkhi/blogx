package users

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/utils"
)

func HandleRegisterUser(w http.ResponseWriter, req *http.Request) {
	type reqBody struct {
		FirstName string         `json:"first_name"`
		LastName  string         `json:"last_name"`
		Email     string         `json:"email"`
		Password  string         `json:"password"`
		Bio       sql.NullString `json:"bio"`
	}
	decoder := json.NewDecoder(req.Body)

	bodyDecoded := reqBody{}

	if err := decoder.Decode(&bodyDecoded); err != nil {
		utils.ResponseJson(w, 400, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}

	apiConfig := pkg.DbInstance()
	// fmt.Println(&apiConfig)

	saltValueString := os.Getenv("BCRYPT_SALT_VALUE")

	saltValue, bcryptErr := strconv.Atoi(saltValueString)

	if bcryptErr != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, bcryptErr)
		return
	}
	hashedPassword, err2 := bcrypt.GenerateFromPassword([]byte(bodyDecoded.Password), saltValue)
	if err2 != nil {
		hashedPassword = []byte(bodyDecoded.Password)
	}

	user, failedToAddToDb := apiConfig.CreateUser(
		req.Context(),
		database.CreateUserParams{
			ID:        uuid.New(),
			FirstName: bodyDecoded.FirstName,
			LastName:  bodyDecoded.LastName,
			Email:     bodyDecoded.Email,
			Password:  string(hashedPassword),
			Bio:       bodyDecoded.Bio,
		},
	)

	if failedToAddToDb != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, failedToAddToDb)
		return
	}

	// create jwt token
	token, expiryTime, jwtTokenError := utils.GetJwt(utils.Credentials{
		Email: bodyDecoded.Email,
		Name:  user.FirstName + user.LastName,
	})

	if jwtTokenError != nil {
		utils.ErrorResponse(w, http.StatusUnauthorized, jwtTokenError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "auth_token",
		Value:   token,
		Expires: expiryTime,
		Path:    "/",
	})

	utils.ResponseJson(w, http.StatusCreated, utils.MapRegisteredUser(user))
}

/*

register user body =
{
	"first_name": "Soham",
	"last_name": "Ratnaparkhi",
	"email": "soham.ratnaparkhi@gmail.com",
	"password": "password",
	"bio": {
		"String": "I am a developer",
		"Valid": true
	}
}

*/
