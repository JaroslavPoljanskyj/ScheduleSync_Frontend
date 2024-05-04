import React, { useContext, useEffect, useState } from "react";
import { ScheduleDataContext } from "./ScheduleDataContext";
import CurrentDayBar from "./CurrentDayBar";
import Event from "./Event";
import ModalWindowForEvent from "./ModalWindowForEvent";
import { useSwipeable } from "react-swipeable";

function SchedulePanel() {
  const { eventList } = useContext(ScheduleDataContext);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("Swiped Left");
      setBackgroundColor("bg-red-500");
    },
    onSwipedRight: () => {
      console.log("Swiped Right");
      setBackgroundColor("bg-blue-500");
    },
  });

  const [backgroundColor, setBackgroundColor] = useState("bg-black");
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const totalMinutesInDay = 1440;
  const totalMinutes = currentHour * 60 + currentMinute;
  const percentage = (totalMinutes / totalMinutesInDay) * 100;

  return (
    <div id="createDivBox" className="w-full h-full my-2 rounded-3xl overflow-hidden">
      <CurrentDayBar />
      <div className={`flex relative mx-2 bg-white h-full shadow-md rounded-3xl overflow-hidden overflow-y-auto`} style={{ height: '85%' }} {...handlers}>
        <div className="grid grid-cols-1 flex-none m-1 h-full w-10" style={{ height: '300%' }}>
          {[...Array(24)].map((_, index) => (
            <div key={index} className={`flex justify-center items-start text-sm text-slate-500`}>
              {`${index}:00`}
            </div>
          ))}
        </div>
        <div className="flex-none mt-4 mb-2 h-full bg-violet-300 w-0.5 relative" style={{ height: '300%' }}>
          <div className="absolute bg-violet-600" style={{ top: `${percentage}%`, transform: 'translate(-50%, -50%)', width: '10px', height: '10px', borderRadius: '50%', left: '50%' }}></div>
        </div>
        <div className="w-full m-2" style={{ height: '300%' }}>
          <div className="h-full grid grid-cols-1" style={{ gridTemplateRows: 'repeat(288, 1fr)' }}>
            {eventList && eventList.map(event => (
              <Event key={event.id} name={event.name} timeFrom={event.TimeFrom} timeTo={event.TimeTo}/>
            ))}
          </div>
          <div className="sticky bottom-4 float-right z-10">
            <button
              className="bg-violet-300 hover:bg-violet-600 text-white font-bold h-12 w-12 rounded-xl"
              onClick={toggleModal}
            >
              +
            </button>
          </div>
          <ModalWindowForEvent showModal={showModal} toggleModal={toggleModal} />
        </div>
      </div>
    </div>
  );
}

export default SchedulePanel;
