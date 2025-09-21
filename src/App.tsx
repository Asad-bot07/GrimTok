import { Input } from "./Components/Input";
import { useState, useEffect } from "react";
import GrimReaperLoader from "./Components/Loader/GrimReaperLoader";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <GrimReaperLoader
          audioSrc="./assets/horror-394969"
          enableGeneratedSound={true}
          duration={20}
          onLoadingComplete={() => console.log("Done!")}
        />
      ) : (
        <div
          className="min-h-screen flex justify-center items-center 
                  bg-gradient-to-bl from-black via-gray-900 to-gray-800
                  relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="animate-[float_20s_linear_infinite] absolute bg-white/5 w-2 h-2 rounded-full top-10 left-20"></div>
            <div className="animate-[float_30s_linear_infinite] absolute bg-white/5 w-1.5 h-1.5 rounded-full top-40 left-60"></div>
            <div className="animate-[float_25s_linear_infinite] absolute bg-white/5 w-3 h-3 rounded-full top-72 left-32"></div>
          </div>
          <div className="relative z-10 w-80">
            <Input />
          </div>
        </div>
      )}
      {/* <OutputPage/> */}
    </div>
  );
};
