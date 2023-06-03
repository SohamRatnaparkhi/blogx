package routers

import (
	auth "github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/handlers/auth"
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/handlers/server"
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/middleware"
	"github.com/go-chi/chi"
)

func SetAuthRouter() chi.Router {
	var authRouter = chi.NewRouter()
	authRouter.Get("/", server.HealthCheck)
	authRouter.Post("/register", auth.HandleRegisterUser)
	authRouter.Post("/login", auth.HandleLoginUser)
	authRouter.Post("/logout", middleware.Auth(middleware.AuthHandler(auth.HandleUserLogout)))
	return authRouter
}
