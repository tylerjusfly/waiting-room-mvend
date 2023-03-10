import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Notify from "./services/notify";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
Notify.notifications.subscribe((alert) => alert instanceof Function && alert());

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthContextProvider>
);
