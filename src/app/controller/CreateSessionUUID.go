package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func CreateSessionUUID(c *fiber.Ctx) error {
	log.Print("Create session uuid")
	response := fiber.Map{
		"sessionID": uuid.NewString(),
	}

	return c.JSON(response)

}
