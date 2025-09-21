import React, { useState, useEffect, useContext } from "react";
import OutputLoader from "./Loader/OutputLoader";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const Output: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  //   const navigate = useNavigate();

  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext not provided");
  const { data } = context;

  const [timeLeft, setTimeLeft] = useState<{ days: number }>({ days: 0 });

  // Random future date for “fate”
  const randomFutureDate = () => {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * 365 * 5) + 30; // 30-1825 days from now
    const future = new Date(now.getTime() + randomDays * 24 * 60 * 60 * 1000);
    return future;
  };

  const [fateDate] = useState<Date>(randomFutureDate());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = fateDate.getTime() - now.getTime();
      const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
      setTimeLeft({ days });
    }, 1000);

    return () => clearInterval(interval);
  }, [fateDate]);

  useEffect(() => {
    // Simulate loader duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <OutputLoader />;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-lg border-2 border-red-700 rounded-3xl p-6 shadow-2xl shadow-red-900/50 text-white relative overflow-hidden">
      {/* Skull icon */}
      <div className="text-center text-8xl mb-4 animate-bounce">💀</div>

      <h2 className="text-3xl font-black text-center text-red-500 mb-6 drop-shadow-lg">
        Your Fate Card ☠️
      </h2>

      {/* User info */}
      <div className="space-y-3 text-lg">
        <div>
          <span className="font-bold text-red-400">Name:</span>{" "}
          {data.name || "Unknown"}
        </div>
        <div>
          <span className="font-bold text-red-400">Age:</span> {data.age || "?"}
        </div>
        <div>
          <span className="font-bold text-red-400">Date of Birth:</span>{" "}
          {data.date || "??/??/????"}
        </div>
        <div>
          <span className="font-bold text-red-400">Gender:</span>{" "}
          {data.gender || "Unknown"}
        </div>
      </div>

      {/* Timer */}
      <div className="mt-8 text-center">
        <div className="text-red-500 font-bold text-2xl mb-2">
          Time Left Until Fate
        </div>
        <div className="text-4xl font-extrabold text-gray-200 drop-shadow-lg animate-pulse">
          {timeLeft.days} Days
        </div>
        <div className="text-gray-400 mt-2 text-lg">
          <span className="font-semibold text-red-400">Date of Expiry:</span>{" "}
          {fateDate.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Decorative flames */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 via-transparent to-transparent opacity-60 animate-ping"></div>
    </div>
  );
};
