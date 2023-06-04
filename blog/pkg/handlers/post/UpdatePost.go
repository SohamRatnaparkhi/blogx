package posts

import (
	"encoding/json"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/google/uuid"
)

func UpdatePostHandler(w http.ResponseWriter, req *http.Request, _ database.User) {
	type reqBody struct {
		PostId uuid.UUID `json:"post_id"`
		Title  string    `json:"title"`
		Body   string    `json:"body"`
		Tags   []string  `json:"tags"`
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

	post, dbErr2 := apiConfig.UpdatePost(req.Context(), database.UpdatePostParams{
		ID:    bodyDecoded.PostId,
		Title: bodyDecoded.Title,
		Body:  bodyDecoded.Body,
		Tags:  bodyDecoded.Tags,
	})

	if dbErr2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, dbErr2)
		return
	}

	utils.ResponseJson(w, http.StatusOK, utils.MapPost(post))
}

/*
testPostBody={
	"id": "some post uuid"
	"title": "test post",
	"body": "test post body",
	"tags": ["test", "post"]
}
*/
