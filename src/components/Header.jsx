import React, { useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  

  return (
    <div className="bg-green-700 text-white py-2 px-4 fixed top-0 w-full z-50  overflow-hidden">
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1 text-lg font-bold hover:text-red-600"
      >
        &times;
      </button>

      {/* Scrolling text */}
      <div className="whitespace-nowrap animate-scroll inline-block">
        Free delivery on orders above Rs.1000! Grab your fresh fruits & vegetables now!
      </div>

      {/* Tailwind animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          display: inline-block;
          padding-right: 100%;
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
