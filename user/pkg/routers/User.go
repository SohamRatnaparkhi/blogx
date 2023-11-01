package routers

import (
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/handlers/server"
	users "github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/handlers/user"
	"github.com/SohamRatnaparkhi/blogx-backend-go/user/pkg/middleware"
	"github.com/go-chi/chi"
)

func SetUserRouter() chi.Router {
	var userRouter = chi.NewRouter()
	userRouter.Get("/", server.HealthCheck)
	userRouter.Delete("/delete", middleware.Auth(middleware.AuthHandler(users.DeleteUser)))
	userRouter.Post("/follow", middleware.Auth(middleware.AuthHandler(users.FollowUser)))
	userRouter.Post("/unfollow", middleware.Auth(middleware.AuthHandler(users.UnFollowUser)))
	userRouter.Post("/update/bio", middleware.Auth(middleware.AuthHandler(users.UpdateUserBio)))
	userRouter.Post("/update/password", middleware.Auth(middleware.AuthHandler(users.UpdateUserPassword)))
	userRouter.Get("/get", middleware.Auth(middleware.AuthHandler(users.GetUserByID)))
	userRouter.Get("/get/email", middleware.Auth(middleware.AuthHandler(users.GetUserByEmail)))
	return userRouter
}
