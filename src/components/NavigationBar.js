import React, { useState } from "react";

function Icon({ path, onClick, isActive }) {
  return (
    <div
      className={`hover-icon hover:bg-violet-300 p-3 hover:shadow-lg hover-dark-shadow rounded-xl`}
      onClick={onClick} // Handle click event
      style={{
        backgroundColor: isActive ? "#C4B5FD" : "",
        transition: "background-color 0.5s ease",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={isActive ? "white" : "black"}
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </div>
  );
}

function NavigationBar() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <footer className="w-full pb-3 flex items-center">
      <div className="flex w-full h-full justify-around">
        <Icon
          path="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          onClick={() => handleIconClick(0)}
          isActive={activeIndex === 0}
        />
        <Icon
          path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          onClick={() => handleIconClick(1)}
          isActive={activeIndex === 1}
        />
        <Icon
          path="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1."
          onClick={() => handleIconClick(2)}
          isActive={activeIndex === 2}
        />
      </div>
    </footer>
  );
}

export default NavigationBar;
