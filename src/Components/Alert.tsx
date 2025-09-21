import React from "react";

interface AlertProps {
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-red-700 text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between min-w-[300px]">
      <span>{props.message}</span>
      {props.onClose && (
        <button
          className="ml-4 font-bold text-xl hover:text-gray-300 transition-colors"
          onClick={props.onClose}
        >
          ×
        </button>
      )}
    </div>
  );
};
