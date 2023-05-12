package model

type Message struct {
	SessionID string `json:"sessionID"`
	UserID    string `json:"userID"`
	Text      string `json:"text"`
}
