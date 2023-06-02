package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/handlers/server"
	"github.com/go-chi/chi"
)

func SetAuthRouter() chi.Router {
	var blogRouter = chi.NewRouter()
	blogRouter.Get("/", server.HealthCheck)
	return blogRouter
}
