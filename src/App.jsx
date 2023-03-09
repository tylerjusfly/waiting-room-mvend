import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";
import AllPosts from "./pages/AllPosts";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Public from "./pages/Public";
import ViewPost from "./pages/ViewPost";

function App() {
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
