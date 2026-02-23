import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col justify-center items-center px-6 font-sans">
      <div
        className={`w-full max-w-[440px] transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Brand Header with Mint Leaf */}
        <header className="mb-10 text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
            {/* Custom Mint Leaf SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C12 22 20 18 20 12C20 6.5 15.5 2 12 2C8.5 2 4 6.5 4 12C4 18 12 22 12 22Z"
                fill="#064E3B"
              />
              <path
                d="M12 22V2M12 22C12 22 15 17 19 16M12 16C12 16 9 12 5 11"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            MintPay
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Fresh. Secure. Simple.</p>
        </header>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <form className="space-y-5">
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Names Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First"
                    className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-[#064E3B] transition-all text-sm"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last"
                    className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-[#064E3B] transition-all text-sm"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-[#064E3B] transition-all text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSignup}
                className="w-full py-4 bg-[#064E3B] text-white rounded-2xl font-bold text-[15px] hover:bg-black active:scale-[0.98] transition-all duration-300 shadow-lg shadow-emerald-900/10"
              >
                Get Started
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#064E3B] font-bold hover:underline underline-offset-8 transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <footer className="mt-12 flex justify-center items-center space-x-2 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">
            Encrypted & Secure
          </span>
        </footer>
      </div>
    </div>
  );
}
