import React from "react";

import ReactDOM from "react-dom/client"

import { RouterProvider } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

import routers from "./router";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <RouterProvider router={routers} />
    </React.StrictMode>
)