import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username,
        password,
        firstName: fName,
        lastName: lName,
      },
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center items-center px-6 font-sans">
      <div
        className={`w-full max-w-[380px] transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Brand Header */}
        <header className="mb-12">
          <div className="h-12 w-12 bg-[#064E3B] rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <div className="h-5 w-5 border-[1.5px] border-white/90 rounded-full" />
          </div>
          <h1 className="text-[28px] font-medium text-gray-900 tracking-tight leading-tight">
            Create an account
          </h1>
          <p className="text-gray-400 mt-2 text-sm font-normal">
            Experience the new standard of digital banking.
          </p>
        </header>

        <form className="space-y-10">
          <div className="space-y-6">
            {/* Inputs with focus-state transitions */}
            <div className="group">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-100 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#064E3B] transition-all duration-500 text-base"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-10">
              <input
                type="text"
                placeholder="First name"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-100 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#064E3B] transition-all duration-500 text-base"
                onChange={(e) => setFname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-100 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#064E3B] transition-all duration-500 text-base"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-100 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#064E3B] transition-all duration-500 text-base"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSignup}
              className="w-full py-4 bg-[#064E3B] text-white rounded-xl font-medium text-[15px] hover:bg-black active:scale-[0.98] transition-all duration-300 shadow-sm"
            >
              Continue
            </button>
          </div>

          <p className="text-center text-[13px] text-gray-400 font-normal">
            Already have an account?{" "}
            <button className="text-[#064E3B] font-medium hover:opacity-70 transition-opacity">
              Sign in
            </button>
          </p>
        </form>

        {/* Footer detail */}
        <footer className="mt-20 flex justify-center space-x-4 opacity-30 grayscale">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
            Secure 256-bit AES
          </span>
        </footer>
      </div>
    </div>
  );
}
