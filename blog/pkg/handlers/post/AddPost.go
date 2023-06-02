package posts

import (
	"encoding/json"
	"net/http"

	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg"
	"github.com/SohamRatnaparkhi/blogx-backend-go/blog/pkg/utils"
	"github.com/SohamRatnaparkhi/blogx-backend-go/db/database"
	"github.com/google/uuid"
)

func CreatePostHandler(w http.ResponseWriter, req *http.Request, user database.User) {
	type reqBody struct {
		Title string
		Body  string
		Tags  []string
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

	post, dbErr2 := apiConfig.CreatePost(req.Context(), database.CreatePostParams{
		ID:     uuid.New(),
		Title:  bodyDecoded.Title,
		Body:   bodyDecoded.Body,
		UserID: user.ID,
		Tags:   bodyDecoded.Tags,
	})

	if dbErr2 != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, dbErr2)
		return
	}

	utils.ResponseJson(w, http.StatusOK, utils.MapPost(post))
}

/*
testPostBody={
	"title": "test post",
	"body": "test post body",
	"tags": ["test", "post"]
}
*/
