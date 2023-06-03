package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/SohamRatnaparkhi/blogx-backend-go/feed/pkg/handlers/server"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")
	PORT := os.Getenv("PORT")
	if PORT == "" {
		log.Println("No PORT found")
	}
	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	v1Router := chi.NewRouter()
	router.Mount("/v1", v1Router)
	v1Router.Get("/health", server.HealthCheck)

	fmt.Printf("\nFeed server starting at http://localhost:%v\n", PORT)

	server := &http.Server{
		Handler: router,
		Addr:    ":" + PORT,
	}

	err := server.ListenAndServe()

	if err != nil {
		log.Fatal(err)
	}
}
