import React, { useState } from "react";
import user from "../../assets/user.avif";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddUser() {
  const [selectedOption, setSelectedOption] = useState("");
  const [date, setDate] = useState(null);

  return (
    <div className="container flex justify-center items-center w-screen h-screen">
      <div className="grid w-full h-full md:w-4/6 md:h-9/10 grid-cols-6 gap grid-rows-8">
        <div className="col-span-2 row-span-2 grid justify-center place-items-center">
          <img className="md:w-4/8" src={user} alt="User" />
        </div>
        <div className="grid col-span-4 row-span-2 justify-center place-items-center">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="border-b-2 border-sky-300 outline-0 p-2 w-full"
          >
            <option value="" disabled>
              ISP
            </option>
            <option value="keralavision">Kerala Vision</option>
            <option value="bsnl">BSNL</option>
            <option value="fiberzone">Fiberzone</option>
            <option value="aliance">Aliance</option>
          </select>
        </div>

        {/* Dynamic Form Rendering */}
        {selectedOption && (
          <div className=" col-span-6 grid row-span-4 md:row-span-5  mx-10 ">
            <input
              className={`mt-2 border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md ${selectedOption ? "h-12 text-lg" : "h-10 text-md"}`}
              type="text"
              placeholder="Username"
            />
            <input
              className={`border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md ${selectedOption === "fiberzone" ? "h-12 text-lg -mt-40 md:-mt-30" : "h-10 text-md mt-2"}`}
              type="password"
              placeholder="Password"
            />

            {/* Additional Fields for Certain ISPs */}
            {["keralavision", "bsnl", "aliance"].includes(selectedOption) && (
              <>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="border-b-2 border-sky-300 p-2 font-medium my-4 md:my-2 text-md"
                    placeholderText="Date Of Birth"
                  />
                <input
                  className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                  type="text"
                  placeholder="Phone"
                />
                <input
                  className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                  type="text"
                  placeholder="Email"
                />
                 <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="border-b-2 border-sky-300 p-2 font-medium my-4 md:my-2 text-md"
                    placeholderText="Date Of Birth"
                  />
                  <textarea 
                      className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                      type="text"
                      placeholder="Address..."
                  >
                  </textarea>
              </>
            )}
          </div>
        )}

        {/* Buttons */}
        {selectedOption && (
          <div className="grid grid-cols-2 col-span-5 md:row-span-2 justify-end place-items-end">
            <button className="bg-gray-300 text-md font-medium text-white px-10 py-2 mt-5 rounded-lg xl:-mr-40">
              Back
            </button>
            <button className="bg-sky-300 text-md font-medium text-white px-10 py-2 mt-5 rounded-lg">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddUser;
