import React, { useEffect, useCallback, useState } from "react"

import { BASE_URL } from "../config/http";

import { useNavigate, useParams } from "react-router-dom"
import { ReadyState } from "react-use-websocket"
import useWebSocket from "react-use-websocket";

const ChatPage = () => {
    
    const navigate = useNavigate()
    
    const { uuid, nickName } = useParams()
    
    const [messageHistory, setMessageHistory] = useState([]);
    const [messageText, setMessageText] = useState("")

    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${BASE_URL}ws/${uuid}/${nickName}`, {
        onOpen: (conn) => {
            console.log("is connected => ", conn)
        }
    })

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];


    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickSendMessage = useCallback(() => {
        return sendMessage(JSON.stringify({
            "sessionID": uuid,
            "userID": nickName,
            "text": messageText
        }))
    })

    const handleGetStyle = (stream) => {
        return JSON.parse(stream.data).userID === nickName ? styleChatBox[0] : styleChatBox[1]
    }

    const styleChatBox = [
        { "fig": "fig-left", "reverse": "", "bg": "bg-primary text-white" },
        { "fig": "fig-right", "reverse": "flex-row-reverse", "bg": "bg-white" }
    ]


    return <React.Fragment>
        <div className="container mt-3 max-height d-flex flex-column justify-content-center align-items-content">
            <div className="card p-3">
                <h6>Welcome <strong>{nickName}</strong>, your session is {connectionStatus}. Let's type!</h6>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-outline-danger" onClick={() => {
                        navigate(`/`)
                    }}>Quit chat</button>
                    <button className="btn btn-success" onClick={() => {
                        navigator.clipboard.writeText(document.location.host + `/${uuid}`)
                        alert("a link to join on your chat was copy to your transfer area, just send your friend")
                    }}>Invate a friend</button>
                </div>
            </div>
            <div className="card mt-3 p-3">
                <p className="text-center">History</p>

                <div className="overflow-auto max-height-chat bg-dark p-4 rounded" id="chat">
                    {messageHistory.map((message, idx) => (
                        <div className={"media d-flex " + handleGetStyle(message).reverse} key={idx}>
                            <div className={"fig-left d-flex justify-content-center flex-column align-items-center " + handleGetStyle(message).fig}>
                                <img src="https://i.pinimg.com/originals/0f/74/64/0f7464a556edc8b48d43a8bb604dbc33.png" className="mr-3" width="64" height="64" />
                                <p className="mt-0 text-white text-center">{JSON.parse(message.data).userID}</p>
                            </div>
                            <div className={"media-body text-dark p-4 rounded " + handleGetStyle(message).bg}>
                                {message ? JSON.parse(message.data).text : null}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-message mt-3 d-flex">
                    <input type="text" className="rounded form-control" onKeyUp={(el) => {
                        setMessageText(el.target.value)
                        if (el.code === "Enter") {
                            handleClickSendMessage()
                        }
                    }} />
                    <button className="btn btn-primary rounded" onClick={handleClickSendMessage}
                        disabled={readyState !== ReadyState.OPEN}>Send</button>
                </div>
            </div>
        </div>

    </React.Fragment >
}

export default ChatPage