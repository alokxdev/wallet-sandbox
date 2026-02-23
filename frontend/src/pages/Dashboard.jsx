import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState("");
  console.log(localStorage.getItem("token"));
  const [filter, setFilter] = useState("");
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

      setBalance(response.data.balance);
      setCurrUser(response.data.user);
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        },
      );
      setUsers(response.data.users);
    };

    fetchUsers();
  }, [filter]);

  function sendMoney(userId, username) {
    navigate(`/send?id=${userId}&name=${username}`);
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* Updated Mint Leaf Icon */}
          <div className="h-10 w-10 bg-[#064E3B] rounded-xl flex items-center justify-center shadow-sm">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C12 22 20 18 20 12C20 6.5 15.5 2 12 2C8.5 2 4 6.5 4 12C4 18 12 22 12 22Z"
                fill="white"
              />
              <path
                d="M12 22V2M12 22C12 22 15 17 19 16M12 16C12 16 9 12 5 11"
                stroke="#064E3B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-none text-gray-900">
              MINTPAY
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#064E3B]">
              E-Wallet
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-900 leading-none">
              {currUser}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Verified</p>
          </div>
          <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="text-xs font-bold text-[#064E3B]">
              {currUser ? currUser[0].toUpperCase() : "U"}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Balance Card Section */}
        <section className="mb-14 p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em]">
              Total Balance
            </p>
            <span className="px-2 py-1 bg-emerald-50 text-[#064E3B] text-[10px] font-bold rounded-md uppercase">
              Live
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-gray-400">₹</span>
            <h2 className="text-5xl font-semibold tracking-tighter text-gray-900">
              {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </section>

        {/* Users Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              Send Money
            </h3>
            <span className="text-xs font-medium text-[#064E3B] cursor-pointer hover:underline underline-offset-4">
              View Contacts
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                placeholder="Search by name or email..."
                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#064E3B]/5 focus:border-[#064E3B] transition-all text-sm outline-none"
                onChange={(e) => setFilter(e.target.value)}
              />
            </form>
          </div>

          {/* User List */}
          <div className="space-y-2">
            {users.map((user) => (
              <div
                className="flex items-center justify-between p-3 bg-white border border-transparent rounded-2xl hover:border-gray-100 hover:shadow-sm transition-all group"
                key={user.username}
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 bg-gray-50 text-[#064E3B] rounded-xl flex items-center justify-center font-bold text-sm border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {user.firstName}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium tracking-wide italic">
                      {`@${user.username}`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => sendMoney(user._id, user.firstName)}
                  className="px-5 py-2 bg-gray-50 text-gray-900 text-xs font-bold rounded-lg hover:bg-[#064E3B] hover:text-white active:scale-[0.97] transition-all"
                >
                  Send
                </button>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-center py-10 text-sm text-gray-400 italic">
                No users found matching your search.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
