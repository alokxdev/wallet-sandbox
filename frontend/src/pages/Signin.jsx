import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username,
        password,
      },
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-[380px]">
        {/* Brand Identity */}
        <header className="mb-12 text-center">
          <div className="mx-auto h-12 w-12 bg-[#064E3B] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 9V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V9M5 9H19C20.1046 9 21 9.89543 21 11V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V11C3 9.89543 3.89543 9 5 9Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Enter your credentials to access your wallet
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-100 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#064E3B] transition-all duration-500 text-base"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-100 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#064E3B] transition-all duration-500 text-base"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-[#064E3B] text-white rounded-xl font-medium text-[15px] hover:bg-black active:scale-[0.98] transition-all duration-300 shadow-sm"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center space-y-4">
          <button className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors">
            Forgot password?
          </button>
          <p className="text-[13px] text-gray-400">
            Don't have an account?{" "}
            <span className="text-[#064E3B] font-medium cursor-pointer hover:underline underline-offset-4">
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
