import type React from "react";
import { useContext, useState, type ChangeEvent } from "react";
import { UserContext } from "../Context/ContextApi";
import { Navigate, useNavigate } from "react-router-dom";

export const Input: React.FC = () => {
  const context = useContext(UserContext);
  const Navigate = useNavigate();
  const { setData } = context;

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [date, setDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // handle name
    setName(event.target.value);
  };
  // console.log(setName);

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    // hanlde age
    setAge(Number(event.target.value));
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle dateofbirth
    setDate(e.target.value);
  };

  const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // handle sex
    setGender(e.target.value);
  };

  const handleSubmit = () => {
    if (name === "" || age === 0 || date === "" || gender === "") {
      alert("Enter the input fields");
    } else if (name != "" && age != 0 || date != "" && gender === "GOD") {
      alert("How can a GOD die??dumbass (It was a trap)");
    } else {
      setData({ name, age, date, gender });
      Navigate("/output");
    }
  };

  const min = "1980-12-31"
  const max = "2007-12-31"

  return (
    <div className="flex flex-col gap-4 bg-red-900/20 backdrop-blur-md px-6 py-6 rounded-2xl shadow-2xl shadow-green-900/50 border-2 border-red-700">
      <h2 className="text-white font-black text-3xl text-center tracking-wider drop-shadow-lg">
        Death Calculator ☠️
      </h2>
      <input
        type="text"
        placeholder="Enter Your Name"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        required
        value={name}
        onChange={handleName}
      />
      <input
        type="number"
        placeholder="Enter Your Current Age"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={age}
        onChange={handleAge}
        required
      />
      <label className="text-red-400 font-semibold text-lg text-center">
        Enter Your Date of Birth
      </label>
      <input
        type="date"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={date}
        onChange={handleDate}
        min={min}
        max={max}
        required
      />
      <label className="text-red-400 font-semibold text-lg text-center">
        Select Your Gender
      </label>
      <select
        className="bg-gray-800 text-white border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 shadow-md text-center"
        value={gender}
        onChange={handleGender}
        required
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="lgtv">LGTV+</option>
        <option value="binary digit">Binary Digit</option>
        <option value="god">GOD</option>
      </select>
      <button
        className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-lg shadow-red-900/50 transition-all duration-300"
        onClick={handleSubmit}
      >
        Calculate ☠️
      </button>
    </div>
  );
};
