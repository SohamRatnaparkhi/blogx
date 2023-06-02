package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/handlers/server"
	users "github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/handlers/user"
	"github.com/go-chi/chi"
)

func SetAuthRouter() chi.Router {
	var authRouter = chi.NewRouter()
	authRouter.Get("/", server.HealthCheck)
	authRouter.Post("/register", users.HandleRegisterUser)
	authRouter.Post("/login", users.HandleLoginUser)
	return authRouter
}
