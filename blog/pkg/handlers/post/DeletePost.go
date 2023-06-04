package posts

import (
	"encoding/json"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/google/uuid"
)

func DeletePostHandler(w http.ResponseWriter, req *http.Request, _ database.User) {
	type reqBody struct {
		PostId uuid.UUID `json:"post_id"`
	}
	decoder := json.NewDecoder(req.Body)

	bodyDecoded := reqBody{}

	if err := decoder.Decode(&bodyDecoded); err != nil {
		utils.ResponseJson(w, 400, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}
	apiConfig := pkg.DbClient

	dbErr2 := apiConfig.DeletePost(req.Context(), bodyDecoded.PostId)

	if dbErr2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, dbErr2)
		return
	}

	utils.ResponseJson(w, http.StatusNoContent, struct{}{})
}

/*
testPostBody={
	"id": "some post uuid"
}
*/
