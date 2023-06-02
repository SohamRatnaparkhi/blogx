package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/SohamRatnaparkhi/blogx-backend-go/db/internal/database"
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

	// fmt.Println(db_url)
	db, dbErr := sql.Open("postgres", db_url)

	if dbErr != nil {
		return nil
	}
	dbQueries := database.New(db)
	return dbQueries
}

var DbClient *database.Queries = DbInstance()
