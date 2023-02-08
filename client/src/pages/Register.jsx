import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmil] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration is success!");
    } catch (err) {
      alert("Failed, try again!");
    }
  };

  return (
    <>
      <Header />
      <div className="flex grow items-center justify-around">
        <div className="p-4 mt-4">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dohn Joe"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmil(e.target.value)}
              placeholder="youremail@email.com"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already have an account?{" "}
              <Link className="underline text-black" to={"/login"}>
                login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
