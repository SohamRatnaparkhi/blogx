package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/SohamRatnaparkhi/go-blog-server/internal/database"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func DbInstance() (*database.Queries, error) {
	//database connection
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db_url := os.Getenv("DB_URL")

	// fmt.Println(db_url)
	db, dbErr := sql.Open("postgres", db_url)

	if dbErr != nil {
		return nil, dbErr
	}
	dbQueries := database.New(db)
	return dbQueries, dbErr
}

var DbClient, err *database.Queries = DbInstance()
