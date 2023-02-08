import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Places from "../components/Places";
import { UserContext } from "../UserContext";

function Account() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  const activeClasses = (type = null) => {
    let classes = "p-2 px-4";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200 rounded-full";
    }
    return classes;
  };

  const handleLogout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <Header />
      {/* <div>account for {user?.name}</div> */}
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link to={"/acount"} className={activeClasses("profile")}>
          My Profile
        </Link>
        <Link to={"/acount/bookings"} className={activeClasses("bookings")}>
          My Bookings
        </Link>
        <Link
          to={"/acount/accomodations"}
          className={activeClasses("accomodations")}
        >
          My Accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} : {user.email}
          <button onClick={handleLogout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "accomodations" && <Places />}
    </>
  );
}

export default Account;
