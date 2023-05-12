package controller

import (
	"log"
	"simple-hash/src/app/config"

	"github.com/gofiber/websocket/v2"
)

func CreateConnection(c *websocket.Conn) {

	defer func() {
		config.Unregister <- c
		c.Close()
	}()

	config.Register <- c

	for {

		messageType, message, err := c.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("read error", err)
			}

			return
		}

		if messageType == websocket.TextMessage {
			config.Broadcast <- string(message)
		} else {
			log.Println("websocket message received of type", messageType)
		}
	}
}
