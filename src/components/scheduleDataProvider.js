import React, { createContext, useEffect, useState } from "react";
import { ScheduleDataContext } from "./ScheduleDataContext";

const ScheduleDataProvider = ({ children }) => {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const activeSchedule = await getActiveSchedule();
      const eventsData = await getEventsForActiveSchedule(activeSchedule.events);
      console.log("events to be loaded from the provider:" + JSON.stringify(eventsData));
      setEventList(eventsData); // Update eventList state with the fetched events
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
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/event/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    await fetch(`http://localhost:8000/schedule/addEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: responseJson.id }), 
      });

    if (response.status < 400) {
      setEventList((prevEvents) => [...prevEvents, responseJson]); // Add the new event to the eventList state
      setEventLoadObject((current) => {
        const updatedData = [...current.data, responseJson];
        updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: updatedData };
      });
      return responseJson;
    } else {
      setEventLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdateEvent(dtoIn) {
    // Assuming dtoIn includes the key property
    const eventId = dtoIn.id; // Accessing the key property as the event id
    
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/event/${eventId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();
  
    if (response.status < 400) {
      // Update the event in the event list
      setEventList((prevEvents) => {
        return prevEvents.map((event) => {
          if (event.id === eventId) {
            return { ...event, ...responseJson };
          }
          return event;
        });
      });
  
      // Update the event in the event load object
      setEventLoadObject((current) => {
        const updatedData = current.data.map((event) => {
          if (event.id === eventId) {
            return { ...event, ...responseJson };
          }
          return event;
        });
        return { state: "ready", data: updatedData };
      });
  
      return responseJson;
    } else {
      setEventLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  
  

  const value = {
    state: eventLoadObject.state,
    eventList,
    handlerMap: { handleCreateEvent, handleUpdateEvent, getActiveSchedule },
  };

  return (
    <ScheduleDataContext.Provider value={value}>
      {children}
    </ScheduleDataContext.Provider>
  );
};

export default ScheduleDataProvider;
