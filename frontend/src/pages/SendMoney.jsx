import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  // 1. Defined the missing state
  const [amount, setAmount] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      setUserBalance(response.data.balance);
    };

    fetchBalance();
  }, []);

  // 2. Defined the missing handler
  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          amount: Number(amount),
          to: id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      alert(response.data.message);
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Transfer failed");
    }
  };
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-[400px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Top Header / Recipient Info */}
        <div className="pt-10 px-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-50 rounded-2xl mb-4 border border-emerald-100">
            <span className="text-2xl font-bold text-[#064E3B]">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Send to {name}
          </h2>
          <p className="text-sm text-gray-400 mt-1 font-medium tracking-tight">
            @verified_recipient
          </p>
        </div>

        {/* Main Form Section */}
        <div className="px-8 pb-10">
          <form onSubmit={handleTransfer} className="space-y-10">
            {/* Amount Entry Area */}
            <div className="text-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-4">
                Enter Amount
              </label>
              <div className="relative inline-flex items-center group">
                <span className="text-3xl font-light text-gray-300 mr-2 group-focus-within:text-[#064E3B] transition-colors">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="0"
                  autoFocus
                  className="w-40 bg-transparent text-5xl font-semibold text-gray-900 placeholder-gray-100 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>

              {/* Balance hint using the passed prop */}
              <p className="mt-4 text-[11px] text-gray-400 font-medium">
                Your balance:{" "}
                <span className="text-gray-900">
                  ₹{userBalance.toLocaleString()}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#064E3B] text-white rounded-2xl font-semibold text-[15px] hover:bg-black active:scale-[0.98] transition-all shadow-md shadow-emerald-900/10"
              >
                Initiate Transfer
              </button>

              <button
                type="button"
                className="w-full py-2 text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors"
              >
                Cancel and go back
              </button>
            </div>
          </form>

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-emerald-500"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              MINTPAY Secure Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
