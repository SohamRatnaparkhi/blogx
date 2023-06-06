package pkg

import (
	"database/sql"
	"log"
	"os"

	"github.com/SohamRatnaparkhi/blogx-backend-go/authentication/db/database"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func DbInstance() *database.Queries {
	//database connection
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db_url := os.Getenv("DB_URL")
	if db_url == "" {
		log.Fatal("DB_URL not found in .env file")
	}

	db, dbErr := sql.Open("postgres", db_url)

	if dbErr != nil {
		return nil
	}
	dbQueries := database.New(db)
	return dbQueries
}

var DbClient *database.Queries = DbInstance()
