package config

import (
	"encoding/json"
	"log"
	"simple-hash/src/app/model"

	"github.com/gofiber/websocket/v2"
)

var Sessions = make(map[*websocket.Conn]model.Session)
var Register = make(chan *websocket.Conn)
var Broadcast = make(chan string)
var Unregister = make(chan *websocket.Conn)

func WebSocketObserver() {

	for {
		select {
		case connection := <-Register:

			registerConnection(connection)

		case stream := <-Broadcast:

			writeMessageOnConnection(stream)

		case connection := <-Unregister:
			unregisterConnection(connection)
		}
	}
}

func unregisterConnection(conn *websocket.Conn) {
	delete(Sessions, conn)
}

func registerConnection(conn *websocket.Conn) {

	ID := conn.Params("id")
	userID := conn.Params("userID")

	session := model.Session{ID: ID, UserID: userID}

	session.ID = ID
	session.UserID = userID

	log.Print(session)

	Sessions[conn] = session

	log.Println("connection registered: ", session)
}

func writeMessageOnConnection(stream string) {

	message := model.Message{}

	if err := json.Unmarshal([]byte(stream), &message); err != nil {

		log.Print("json unmarshal error", err)
		return

	}

	log.Print(message)

	for conn, session := range Sessions {

		if session.ID == message.SessionID {

			log.Print("session detected, writing  message to conn")

			if err := conn.WriteMessage(websocket.TextMessage, []byte(stream)); err != nil {

				log.Print("failed on send message")

				Unregister <- conn
				conn.WriteMessage(websocket.CloseMessage, []byte{})

			}

		}

	}

}
