import { http } from "../config/http"

const createSession = async () => {
    console.log("createSession function executing")
    const { data } = await http.get("/create-session-id")
    return data.sessionID
}

export { createSession }