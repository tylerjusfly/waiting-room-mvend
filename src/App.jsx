import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";
import AllPosts from "./pages/AllPosts";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Public from "./pages/Public";
import ViewPost from "./pages/ViewPost";

import { useIdleTimer } from "react-idle-timer";

import { useAuthContext } from "./hooks/useAuthContext";
import { notifySuccess } from "./services/notify";

function App() {
  const { user, logOut } = useAuthContext();

  const onIdle = () => {
    // Do some idle action like log out your user
    if (user.user) {
      notifySuccess("session expired");
      logOut();
    }
    console.log(user);
  };

  // Logs user out if user is idle for 10 seconds
  const { isIdle } = useIdleTimer({ onIdle, timeout: 10 * 1000 });

  return (
    <div>
      <ToastContainer autoClose={3500} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="all-articles" element={<AllPosts />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post/id" element={<ViewPost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
