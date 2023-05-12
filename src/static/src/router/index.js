import { createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/ChatPage";

import HomePage from "../pages/HomePage";

const routers = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
    },
    {
        path: "/:uuid",
        Component: HomePage,
    },
    {
        path: "/chat/:uuid/:nickName",
        Component: ChatPage,
    }
])

export default routers