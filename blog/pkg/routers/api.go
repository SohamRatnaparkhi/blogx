package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/handlers/server"

	"github.com/go-chi/chi"
)

func SetAllRouters() chi.Router {
	apiRouter := chi.NewRouter()

	apiRouter.Get("/", server.HealthCheck)

	blogRouter := SetBlogRouter()
	apiRouter.Mount("/blogs", blogRouter)

	return apiRouter
}
