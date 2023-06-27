package posts

import (
	"encoding/json"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/db/database"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/google/uuid"
)

// @title Delete a post
// @version 1
// @description Delete a post with post id given in the body
// @Tags posts
// @accept json
// @produce json
// @success 204 {object} string
// @failure 400 {object} string
// @failure 500 {object} string
// @router /blogs/deleteBlog [delete]
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
