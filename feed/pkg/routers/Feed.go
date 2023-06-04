package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/handlers/server"
	"github.com/go-chi/chi"
)

func SetFeedRouter() chi.Router {
	var feedRouter = chi.NewRouter()
	feedRouter.Get("/", server.HealthCheck)

	return feedRouter
}
