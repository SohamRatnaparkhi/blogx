package utils

import (
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

type Credentials struct {
	Email string
	Name  string
}

type Claims struct {
	Creds Credentials
	jwt.RegisteredClaims
}

func GetJwt(signerClaims Credentials) (tokenString string, expireTime time.Time, err error) {
	godotenv.Load()
	var jwtKey string = os.Getenv("JWT_SECRET_KEY")
	expiryTime := time.Now().Add(50 * time.Minute) // restore required after 50 minutes
	claims := Claims{
		Creds: signerClaims,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiryTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err = token.SignedString([]byte(jwtKey))

	return tokenString, expireTime, err
}

func RefreshJwt(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	var jwtKey string = os.Getenv("JWT_SECRET_KEY")
	c, err := r.Cookie("auth_token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	tknStr := c.Value
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	/* 	We ensure that a new token is not issued until enough time has elapsed
	In this case, a new token will only be issued if the old token is within
	30 seconds of expiry. Otherwise, return a bad request status
	*/
	if time.Until(claims.ExpiresAt.Time) > 30*time.Second {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Now, create a new token for the current use, with a renewed expiration time
	expirationTime := time.Now().Add(5 * time.Minute)
	claims.ExpiresAt = jwt.NewNumericDate(expirationTime)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Set the new token as the users `token` cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "auth_token",
		Value:   tokenString,
		Expires: expirationTime,
		Path:    "/",
	})
}
