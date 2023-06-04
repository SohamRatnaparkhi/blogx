package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/pkg/middleware"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/handlers/feed"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/handlers/server"
	"github.com/go-chi/chi"
)

func SetFeedRouter() chi.Router {
	var feedRouter = chi.NewRouter()
	feedRouter.Get("/", server.HealthCheck)
	feedRouter.Get("/allPosts", middleware.Auth(middleware.AuthHandler(feed.AllPostNoPage)))
	feedRouter.Get("/allPostsPageWise", middleware.Auth(middleware.AuthHandler(feed.AllPostWithPage)))
	feedRouter.Get("/postWithId", middleware.Auth(middleware.AuthHandler(feed.GetPostWithPostId)))
	feedRouter.Get("/myPosts", middleware.Auth(middleware.AuthHandler(feed.GetMyPosts)))
	feedRouter.Get("/postWithUserId", middleware.Auth(middleware.AuthHandler(feed.GetPostWithPostId)))

	return feedRouter
}
