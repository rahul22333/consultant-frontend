import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "react-hot-toast";

import {
  loginAdmin,
} from "../utils/auth";

export default function AdminLogin() {

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = () => {

    const success =
      loginAdmin(password);

    if (!success) {

      toast.error(
        "Wrong password"
      );

      return;
    }

    toast.success(
      "Login successful"
    );

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-5 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </div>
    </div>
  );
}