package utils

import (
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
