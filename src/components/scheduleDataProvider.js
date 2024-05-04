import React, { createContext, useEffect, useState } from "react";
import { ScheduleDataContext } from "./ScheduleDataContext";

const ScheduleDataProvider = ({ children }) => {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const activeSchedule = await getActiveSchedule();
      const eventsData = await getEventsForActiveSchedule(activeSchedule.events);
      setEventLoadObject({ state: "ready", data: eventsData });
    } catch (error) {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  async function getActiveSchedule() {
    const scheduleResponse = await fetch('http://localhost:8000/schedule/list');
    const scheduleData = await scheduleResponse.json();
  
    let activeSchedule = null;
  
    scheduleData.forEach(schedule => {
      if (schedule.isActive) {
        activeSchedule = schedule;
        return;
      }
    });
    return activeSchedule;
  }

  async function getEventsForActiveSchedule(eventsIds) {
    const fetchPromises = eventsIds.map(async eventObj => {
      const id = eventObj.id;
      const response = await fetch(`http://localhost:8000/event/${id}/get`);
      const data = await response.json();
      return data;
    });

    const eventsData = await Promise.all(fetchPromises);
    return eventsData;
  }

  async function handleCreateEvent(dtoIn) {
    // setEventLoadObject((current) => ({ ...current, state: "pending" }));
    // const response = await fetch(`http://localhost:8000/event/create`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dtoIn),
    // });
    // const responseJson = await response.json();

    // if (response.status < 400) {
    //   setEventLoadObject((current) => {
    //     current.data.push(responseJson);
    //     current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
    //     return { state: "ready", data: current.data };
    //   });
    //   return responseJson;
    // } else {
    //   setEventLoadObject((current) => {
    //     return { state: "error", data: current.data, error: responseJson };
    //   });
    //   throw new Error(JSON.stringify(responseJson, null, 2));
    // }
    console.log("po kliknutí jsou data:" + JSON.stringify(dtoIn));
  }

  const value = {
    state: eventLoadObject.state,
    eventList: eventLoadObject.data || [],
    handlerMap: { handleCreateEvent },
  };

  return (
    <ScheduleDataContext.Provider value={value}>
      {children}
    </ScheduleDataContext.Provider>
  );
};

export default ScheduleDataProvider;
