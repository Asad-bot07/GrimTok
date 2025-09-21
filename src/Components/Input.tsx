import React, { useContext, useState } from "react";
import { UserContext } from "../Context/ContextApi";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export const Input: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { setData } = context;

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [date, setDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [alertMessage, setAlertMessage] = useState<string>("");

  const minDate = "1980-12-31"; // minimum DOB allowed
  const maxDate = "2007-12-31"; // maximum DOB allowed (18+)

  const handleSubmit = () => {
    // Validation
    if (!name.trim() || !age || !date || !gender) {
      setAlertMessage("Please fill all fields!");
      return;
    }

    if (gender === "god") {
      setAlertMessage("How can a GOD die?? Dumbass!!! (It was a trap)");
      return;
    }

    if (gender === "lgtv") {
      setAlertMessage(`There are only two genders! ${name} sounds gay tho 😏`);
      return;
    }

    if (gender === "binary digit") {
      setAlertMessage("Are you assembly or what?? 🤯");
      return;
    }

    // Save data to context
    setData({ name, age, date, gender });

    // Navigate to Output page
    navigate("/output");
  };

  return (
    <div className="flex flex-col gap-4 bg-red-900/20 backdrop-blur-md px-6 py-6 rounded-2xl shadow-2xl shadow-green-900/50 border-2 border-red-700 relative">
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
      )}

      <h2 className="text-white font-black text-3xl text-center tracking-wider drop-shadow-lg">
        Death Calculator ☠️
      </h2>

      <input
        type="text"
        placeholder="Enter Your Name"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Enter Your Current Age"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={age || ""}
        onChange={(e) => setAge(Number(e.target.value))}
        min={18}
        required
      />

      <label className="text-red-400 font-semibold text-lg text-center">
        Enter Your Date of Birth
      </label>
      <input
        type="date"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={minDate}
        max={maxDate}
        required
      />

      <label className="text-red-400 font-semibold text-lg text-center">
        Select Your Gender
      </label>
      <select
        className="bg-gray-800 text-white border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 shadow-md text-center"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
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
