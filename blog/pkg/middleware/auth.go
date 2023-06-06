package middleware

import (
	"fmt"
	"net/http"
	"os"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

type AuthHandler func(http.ResponseWriter, *http.Request, database.User)

func Auth(handler AuthHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		godotenv.Load()
		var jwtKey string = os.Getenv("JWT_SECRET_KEY")
		jwtToken, err := req.Cookie("auth_token")

		if err != nil {
			if err == http.ErrNoCookie {
				fmt.Println("No cookie")
				utils.ErrorResponse(w, http.StatusUnauthorized, err)
				return
			}
			utils.ErrorResponse(w, http.StatusUnauthorized, err)
			return
		}
		tknStr := jwtToken.Value
		claims := &utils.Claims{}

		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtKey), nil
		})
		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			fmt.Println("No valid jwt - " + tknStr)
			utils.ErrorResponse(w, http.StatusUnauthorized, err)
			return
		}
		if !tkn.Valid {
			utils.ErrorResponse(w, http.StatusUnauthorized, err)
			return
		}
		userEmail := claims.Creds.Email
		apiConfig := pkg.DbClient

		user, dbErr2 := apiConfig.GetUserByEmail(req.Context(), userEmail)
		if dbErr2 != nil {
			utils.ErrorResponse(w, http.StatusInternalServerError, dbErr2)
			return
		}

		handler(w, req, user)
	}
}
