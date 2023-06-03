package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/handlers/server"

	"github.com/go-chi/chi"
)

func SetAllRouters() chi.Router {
	apiRouter := chi.NewRouter()

	apiRouter.Get("/", server.HealthCheck)

	userRouter := SetUserRouter()
	apiRouter.Mount("/user", userRouter)

	return apiRouter
}
