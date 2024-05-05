import React, { useState, useEffect, useContext } from "react";
import { ScheduleDataContext } from "./ScheduleDataContext";

function ModalWindowForEvent({ showModal, toggleModal, eventModalType, eventUpdateProps }) {
  // Define state variables for modal inputs
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [selectedColor, setSelectedColor] = useState("#2563eb");
  const [eventName, setEventName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [repeatFrequency, setRepeatFrequency] = useState("none");
  const [eventDescription, setEventDescription] = useState("");


  // Update state values based on eventUpdateProps when eventModalType is 'Update'
  useEffect(() => {
    if (eventModalType === 'Update' && eventUpdateProps) {
      const { timeStart, timeEnd, selectedColor, eventName, dayOfWeek, repeatFrequency, eventDescription } = eventUpdateProps;
        setStartTime(timeStart);
        setEndTime(timeEnd);
        setSelectedColor(selectedColor);
        setEventName(eventName);
        setDayOfWeek(dayOfWeek);
        setRepeatFrequency(repeatFrequency);
        setEventDescription(eventDescription);
      
    }
  }, [eventModalType, eventUpdateProps]);
  
  const { handlerMap } = useContext(ScheduleDataContext);

  const handleCreateOrUpdateEvent = () => {
    if (eventModalType === "Create") {
      // Call the handleCreateEvent method from the provider
      handlerMap.handleCreateEvent({
        startTime,
        endTime,
        selectedColor,
        eventName,
        dayOfWeek,
        repeatFrequency,
        eventDescription,
      });
    } else if (eventModalType === "Update") {
      const { id } = eventUpdateProps;
      // Call the handleUpdateEvent method from the provider
      handlerMap.handleUpdateEvent({
        startTime,
        endTime,
        selectedColor,
        eventName,
        dayOfWeek,
        repeatFrequency,
        eventDescription,
        id
      });
    }
    // Close the modal after creating/updating the event
    toggleModal();
  };
  

  // Function to handle time change
  const handleTimeChange = (event, setTime) => {
    setTime(event.target.value);
  };

  // Function to handle color change
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  

  // Style object to dynamically change background color
  const colorPickerStyle = {
    backgroundColor: selectedColor,
  };

  return (
    showModal && (
      <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-ful ">
        <div className="relative py-4 px-6 w-full max-w-md max-h-full  ">
          <div className="relative rounded-lg shadow-xl border border-gray-400 ">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-violet-200 ">
              <h3 className="text-lg font-semibold text-black">
                  {eventModalType === "Create" ? "Create new event" : "Update event"}
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleModal}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal Body */}
            <form  className="p-4 md:p-5 bg-violet-100">
              <div className="grid gap-4 mb-4 grid-cols-2">
                {/* Event Name Input */}
                <div className="col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                  <input type="text" name="name" id="name" value={eventName} onChange={(e) => setEventName(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Event name" required=""/>
                </div>
                <div className="col-span-2"></div>
                {/* Options for selecting day of the week + repeating */}
                <div className="col-span-1 flex items-center">
                  <label htmlFor="day-of-week" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Day of Week:</label>
                  <select id="day-of-week" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className=" p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-violet-600 dark:border-gray-500 dark:placeholder-gray-400">
                    {/* Options for selecting day of the week */}
                    <option value="Monday" className="text-xs">Monday</option>
                    <option value="Tuesday" className="text-xs">Tuesday</option>
                    <option value="Wednesday" className="text-xs">Wednesday</option>
                    <option value="Thursday" className="text-xs">Thursday</option>
                    <option value="Friday" className="text-xs">Friday</option>
                    <option value="Saturday" className="text-xs">Saturday</option>
                    <option value="Sunday" className="text-xs">Sunday</option>
                  </select>
                </div>

                <div className="col-span-1 flex items-center">
                  <label htmlFor="repeat-frequency" className="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-black">Repeat Frequency:</label>
                  <select id="repeat-frequency" value={repeatFrequency} onChange={(e) => setRepeatFrequency(e.target.value)} className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-violet-600 dark:border-gray-500 dark:placeholder-gray-400">
                    <option value="none" className="text-xs">Don't Repeat</option>
                    <option value="daily" className="text-xs">Daily</option>
                    <option value="weekly" className="text-xs">Weekly</option>
                  </select>
                </div>

                {/* Start Time Input */}
                <div className="col-span-1 ">
                  <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Start time:</label>
                  <div className="relative ">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <input type="time" id="start-time" value={startTime} onChange={(event) => handleTimeChange(event, setStartTime)} className=" border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-violet-600 dark:focus:border-violet-600" required />
                  </div>
                </div>
                {/* End Time Input */}
                <div className="col-span-1">
                  <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">End time:</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <input type="time" id="end-time" value={endTime} onChange={(event) => handleTimeChange(event, setEndTime)} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-violet-600 dark:focus:border-violet-600" required />
                  </div>
                </div>
                {/* Color Picker */}
                <div className="col-span-2">
                  <div className="flex items-center">
                    <span className="block text-sm font-medium text-gray-900 mr-6">Select event color:</span>
                    <input type="color" className="p-1 h-10 w-14 block bg-white border-none cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900" id="hs-color-input" value={selectedColor} onChange={handleColorChange} title="Choose your color" style={colorPickerStyle}/>
                  </div>
                </div>
                {/* Event Description Input */}
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Note</label>
                  <textarea id="description" rows="4" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write event note here"></textarea>                    
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                {/* Cancel Button */}
                <button type="button" onClick={toggleModal} className="text-white inline-flex hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-violet-400">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 0 0 2 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h1a1 1 0 011-1v-6a1 1 0 01-1-1v-1a1 1 0 011-1h1V6a1 1 0 01-1-1h-6z" clipRule="evenodd"></path></svg>
                  Cancel
                </button>

                {/* Submit Button */}
                <button type="submit" onClick={handleCreateOrUpdateEvent} className="text-white inline-flex hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-violet-400">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 0 0 2 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h3a1 1 0 110 2h-3v3a1 1 0 112 0v-3h1a1 1 0 011-1v-6a1 1 0 01-1-1v-1a1 1 0 011-1h1V6a1 1 0 01-1-1h-6z" clipRule="evenodd"></path></svg>
                  {eventModalType === "Create" ? "Create" : "Update" }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalWindowForEvent;
