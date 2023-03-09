import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Notify from "./services/notify";
import { PostContextProvider } from "./context/MyPostContext";

Notify.notifications.subscribe((alert) => alert instanceof Function && alert());

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <PostContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostContextProvider>
  </AuthContextProvider>
);
