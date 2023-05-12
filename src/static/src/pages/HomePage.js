import React, { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

import { createSession } from "../service/startSession"

const HomePage = () => {

    const navigate = useNavigate()

    const [nickName, setNickName] = useState("")

    const { uuid } = useParams()

    const startSession = async () => {

        let sessionID = uuid

        if (sessionID == undefined) {
            sessionID = await createSession()
        }

        navigate(`/chat/${sessionID}/${nickName}`)


    }

    return <React.Fragment>

        <div className="container">

            <div className="d-flex justify-content-center align-items-center max-height">

                <div className="card p-3">

                    <div className="mb-3">
                        <label htmlFor="nickName" className="form-label">Your nick name</label>
                        <input type="email" className="form-control" onKeyUp={(el) => {
                            setNickName(el.target.value)
                            if (el.code === "Enter") {
                                startSession()
                            }
                        }} placeholder="Josimar Caminhões" />
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-success" onClick={startSession}>Create session</button>
                    </div>

                </div>
            </div>

        </div>

    </React.Fragment>

}

export default HomePage