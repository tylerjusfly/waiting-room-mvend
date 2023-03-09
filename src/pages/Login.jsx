import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Users } from "../services/dummydata";
import { notifyError, notifySuccess } from "../services/notify";

import waiting from "../assets/rhombus-loader.gif";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch, user } = useAuthContext();

  const submitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // find username in dummy data
    const getUser = Users.find((user) => user.username === username);

    // check Password

    if (!getUser || getUser.password !== password.toLowerCase()) {
      console.log("User not found");
      notifyError("User not found");
      setLoading(false);
    }

    const values = { id: getUser.id, username, password };

    if (getUser.password === password.toLowerCase()) {
      notifySuccess("Login Success");
      dispatch({ type: "LOGIN", payload: values });
      navigate("/dashboard");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4 text-center">
          Login
        </span>
        <form className="mb-4" onSubmit={submitLogin}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Username
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="username"
              name="username"
              id="username"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Password
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="bg-white border-2 border-green-700 hover:bg-green-700 text-black uppercase text-sm font-semibold px-4 py-2 rounded">
            {loading ? <img src={waiting} width={13} /> : "Login"}
          </button>
        </form>
        <Link className="text-blue-700 text-center text-sm" to="signup">
          Not Signed Up yet?
        </Link>
      </div>
    </div>
  );
};

export default Login;
