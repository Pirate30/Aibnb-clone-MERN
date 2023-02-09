import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AccountNav from "./AccountNav";

function Places() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    async function check() {
      const { data } = await axios.get("/places");
      setPlaces(data);
    }

    check();
  }, []);

  return (
    <div>
      <Header />
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white px-4 py-2 rounded-full"
          to={"/acount/accomodations/new"}
        >
          Add New Place
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-4">
        {/* {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/acount/accomodations/" + place._id}
              className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl"
            >
              <div className="w-30 h-30 grow shrink-0 bg-gray-400">
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl ">{place.title}</h2>
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))} */}
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/acount/accomodations/" + place._id}
              className="flex cursor-pointer gap-3 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="w-32 h-32 object-cover"
                    src={"http://localhost:5000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Places;
