import { Input } from "./Components/Input";

export const App: React.FC = () => {
  return (
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
  );
};
