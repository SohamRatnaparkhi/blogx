package server

import (
	"fmt"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/utils"
)

func HealthCheck(res http.ResponseWriter, _ *http.Request) {
	databaseObject := pkg.DbClient
	if databaseObject == nil {
		utils.ErrorResponse(res, http.StatusInternalServerError, fmt.Errorf("database error"))
		return
	}
	type resp struct {
		Status string `json:"status"`
	}
	utils.ResponseJson(res, 200, resp{
		Status: "ok",
	})
}
