import React from "react";
import { useLocation, Link } from "react-router-dom";

function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
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
  return (
    <>
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
    </>
  );
}

export default AccountNav;
