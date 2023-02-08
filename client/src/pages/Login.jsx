import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

function Login() {
  const [email, setEmil] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.post("/login", {
        email,
        password,
      });
      alert("Login Success!");
      setUser(user.data);
      setRedirect(true);
    } catch (err) {
      alert("Login Failed, Try Again!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <div className="flex grow items-center justify-around">
        <div className="p-4 mt-4">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="youremail@email.com"
              onChange={(e) => setEmil(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
