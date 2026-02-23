import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Username: ${username} Password: ${password}`);
    navigate("/dashboard");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signin</button>
      </form>
    </>
  );
}
