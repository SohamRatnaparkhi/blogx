package server

import (
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/utils"
)

func HealthCheck(res http.ResponseWriter, _ *http.Request) {
	type resp struct {
		Status string `json:"status"`
	}
	utils.ResponseJson(res, 200, resp{
		Status: "ok",
	})
}
