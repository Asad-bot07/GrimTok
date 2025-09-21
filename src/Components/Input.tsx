import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { UserContext } from "../Context/UserContext";

export const Input: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { setData } = context;

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [alertMessage, setAlertMessage] = useState<string>("");

  const minDate = "1980-12-31";
  const maxDate = "2007-12-31";

  const validateInputs = (): string | null => {
    if (!name.trim() || !age || !date || !gender)
      return "Please fill all fields!";
    if (gender === "god")
      return "How can a GOD die?? Dumbass!!! (It was a trap)";
    if (gender.toLowerCase() === "lgtv")
      return `There are only two genders! ${name} sounds gay tho 😏`;
    if (gender === "binary digit") return "Are you assembly or what?? 🤯";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateInputs();
    if (error) {
      setAlertMessage(error);
      return;
    }

    setData({ name, age, date, gender });
    navigate("/output");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-red-900/20 backdrop-blur-md px-6 py-6 rounded-2xl shadow-2xl shadow-green-900/50 border-2 border-red-700 relative"
    >
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
      )}

      <h2 className="text-white font-black text-3xl text-center tracking-wider drop-shadow-lg">
        Death Calculator ☠️
      </h2>

      <input
        id="name"
        type="text"
        placeholder="Enter Your Name"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        id="age"
        type="number"
        placeholder="Enter Your Current Age"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={age || ""}
        onChange={(e) => setAge(Number(e.target.value))}
        min={18}
        required
      />

      <label
        htmlFor="dob"
        className="text-red-400 font-semibold text-lg text-center"
      >
        Enter Your Date of Birth
      </label>
      <input
        id="dob"
        type="date"
        className="bg-gray-800 text-white text-center border-2 border-red-600 focus:border-green-500 focus:ring-2 focus:ring-red-700 rounded-lg px-4 py-2 outline-none placeholder-gray-400 shadow-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={minDate}
        max={maxDate}
        required
      />

      <label
        htmlFor="gender"
        className="text-red-400 font-semibold text-lg text-center"
      >
        Select Your Gender
      </label>
      <select
        id="gender"
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
        type="submit"
        className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-lg shadow-red-900/50 transition-all duration-300"
      >
        Calculate ☠️
      </button>
    </form>
  );
};
