package utils

import (
	"encoding/json"
	"net/http"
)

func ResponseJson(w http.ResponseWriter, code int, payload interface{}) {
	data, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(data)
}

func ErrorResponse(w http.ResponseWriter, code int, err error) {
	ResponseJson(w, code, struct {
		Error string `json:"error"`
	}{
		Error: err.Error(),
	})
}
