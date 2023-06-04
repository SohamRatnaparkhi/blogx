package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/handlers/server"

	"github.com/go-chi/chi"
)

func SetAllRouters() chi.Router {
	apiRouter := chi.NewRouter()

	apiRouter.Get("/", server.HealthCheck)

	blogRouter := SetFeedRouter()
	apiRouter.Mount("/feed", blogRouter)

	return apiRouter
}
