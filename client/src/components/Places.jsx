import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Places() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputSubHeader = (desc) => {
    return <p className="text-gray-500 text-sm">{desc}</p>;
  };

  const preInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputSubHeader(desc)}
      </>
    );
  };

  const { action } = useParams();

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const handleUploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      data.append("photos", files[i]);
    }
    // data.set('photos', files)
    const { data: filenames } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div className="p-5">
          <form>
            {preInput("Title", "")}
            {/* <h2>Title</h2> */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title, eg: My Lovely apt"
            />
            {preInput("Address", "")}
            {/* <h2>Address</h2> */}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="address"
            />
            {preInput("Photos", "")}
            {/* <h2>Photos</h2> */}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                type="text"
                placeholder="Add using image link...jpg"
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 grow px-2 rounded-xl"
              >
                Add&nbsp;Image
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-30 flex">
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={"http://localhost:5000/uploads/" + link}
                      alt=""
                    />
                  </div>
                ))}
              <label className="h-30 cursor-pointer flex justify-center items-center gap-1 border bg-transparent rounded-xl p-2 text-2xl text-gray-600">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                upload
              </label>
            </div>
            {preInput("Description", "")}
            {/* <h2>Description</h2> */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput("Perks", "")}
            {/* <h2>Perks</h2> */}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <label className="border p-4 flex rounded-xl gap-2 items-center ">
                <input type="checkbox" />
                <span>Wi-Fi</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center ">
                <input type="checkbox" />
                <span>Parking Spot</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center ">
                <input type="checkbox" />
                <span>Tv</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center ">
                <input type="checkbox" />
                <span>Pets</span>
              </label>
            </div>
            {preInput("Extra Information", "")}
            {/* <h2>Extra Information</h2> */}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput("Check in & out times, max guests", "")}
            {/* <h2>Check in & out times, max guests</h2> */}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max guests</h3>
                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <button className="primary my-2">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Places;
