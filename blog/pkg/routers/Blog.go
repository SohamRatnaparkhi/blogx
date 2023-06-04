package routers

import (
	posts "github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/handlers/post"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/handlers/server"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/middleware"
	"github.com/go-chi/chi"
)

func SetBlogRouter() chi.Router {
	var blogRouter = chi.NewRouter()
	blogRouter.Get("/", server.HealthCheck)
	blogRouter.Post("/addBlog", middleware.Auth(middleware.AuthHandler(posts.CreatePostHandler)))
	blogRouter.Patch("/updateBlog", middleware.Auth(middleware.AuthHandler(posts.UpdatePostHandler)))
	blogRouter.Delete("/deleteBlog", middleware.Auth(middleware.AuthHandler(posts.DeletePostHandler)))
	return blogRouter
}
