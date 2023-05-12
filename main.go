package main

import (
	"log"
	"simple-hash/src/app/config"
	"simple-hash/src/app/controller"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
)

func main() {

	app := fiber.New()

	app.Static("/static", "src/static/build/static/")
	app.Static("/", "src/static/build/index.html")

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000, http://127.0.0.1:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use("/ws", controller.WebSocketUpgrade)
	app.Get("/ws/:id/:userID", websocket.New(controller.CreateConnection))
	app.Get("/create-session-id", controller.CreateSessionUUID)

	go config.WebSocketObserver()

	log.Fatal(app.Listen(":5000"))

}
