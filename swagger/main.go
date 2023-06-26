package main

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/swagger/utils"
	"github.com/go-chi/chi"
)

func main() {
	router := chi.NewRouter()
	v1Router := chi.NewRouter()
	v1Router.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		utils.ResponseJson(w, 200, struct {
			Status string `json:"status"`
		}{
			Status: "OK",
		})
	})
	router.Mount("/v1", v1Router)

}
