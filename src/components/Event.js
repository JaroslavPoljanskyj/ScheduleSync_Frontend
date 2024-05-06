import React, { useState } from "react";
import ModalWindowForEvent from "./ModalWindowForEvent";

function Event({
  timeStart,
  timeEnd,
  selectedColor,
  eventName,
  dayOfWeek,
  repeatFrequency,
  eventDescription,
  id
}) {
 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowDropdown(false); // Close the dropdown when opening the modal
  };

  // Parse the time data into minutes and round the minutes
  const fromHours = parseInt(timeStart.split(':')[0]);
  const fromMinutes = Math.round(parseInt(timeStart.split(':')[1]) / 5) * 5;
  const toHours = parseInt(timeEnd.split(':')[0]);
  const toMinutes = Math.round(parseInt(timeEnd.split(':')[1]) / 5) * 5;
  
  // Calculate the difference between timeEnd and timeStart in minutes
  const minutesDiff = (toHours - fromHours) * 60 + (toMinutes - fromMinutes);
  
  // Calculate the gridRow based on timeStart
  const gridRow = fromHours * 60 / 5 + fromMinutes / 5 + 1;

  const handleEdit = () => {
    // Logic for editing the event
    toggleModal(); // Open the modal window
  };

  const handleDelete = () => {
    // Logic for deleting the event
    console.log("Delete event:", eventName);
  };

  return (
    <div
      className={` rounded-md p-2 flex flex-col border-2 justify-center items-start relative`}
      style={{
        gridRow: `${gridRow} / span ${minutesDiff / 5}`,
        backgroundColor: selectedColor,
        alignItems: minutesDiff >= 120 ? 'center' : 'flex-start', // Center content vertically if event spans 2 hours or more
      }}
    >
      <div className="font-bold text-lg text-black">{eventName}</div>
      <div className="text-gray-600 text-sm ">{timeStart} - {timeEnd}</div>
      <div className="absolute top-0 right-0 mt-1 mr-1">
        <div className="relative">
          <button onClick={toggleDropdown} className="text-gray-600 focus:outline-none">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>
          {showDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={handleEdit} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Upravit</button>
                <button onClick={handleDelete} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Smazat</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <ModalWindowForEvent 
          showModal={showModal} 
          toggleModal={toggleModal} 
          eventModalType={"Update"} 
          eventUpdateProps={{
            timeStart,
            timeEnd,
            selectedColor,
            eventName,
            dayOfWeek,
            repeatFrequency,
            eventDescription,
            id
          }}
        />
      )}   
    </div>
  );
}

export default Event;
