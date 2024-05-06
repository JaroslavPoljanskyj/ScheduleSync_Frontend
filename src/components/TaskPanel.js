import React, { useState, useEffect } from 'react';
import CalendarComponent from './calendar'; 
import TaskDetail from './TaskDetail';
import CurrentDayBar from './CurrentDayBar';

function TaskPanel(){
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentTime, setCurrentTime] = useState('');

    // Function to get the current month and day
    const getCurrentMonthAndDay = () => {
        const currentDate = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = monthNames[currentDate.getMonth()];
        const currentDay = currentDate.getDate();
        return `${currentMonth} ${currentDay},`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
            setCurrentTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full my-2 rounded-3xl overflow-hidden">
            {/* Current Month and Day */}
            <div className=" pb-2 pl-2 flex place-items-end justify-start" style={{ height: '10%' }}>
                <h1 className="text-5xl font-bold text-gray-600">{getCurrentMonthAndDay()} {currentTime}</h1>
            </div>
            <CurrentDayBar setSelectedDay={setSelectedDay} selectedDay={selectedDay} />

            <div className=" flex items-center px-4 mb-2 mt-4">
                {/* Buttons: All, Upcoming, Done */}
                <button className="bg-gray-100 border-violet-600 border hover:bg-violet-600 text-gray-700 hover:border-violet-300 hover:text-white font-bold py-1 m-1 px-4 rounded-2xl">All</button>
                <button className="bg-gray-100 border-violet-600 border hover:bg-violet-600 text-gray-700 hover:border-violet-300 hover:text-white font-bold py-1 m-1 px-4 rounded-2xl">Upcoming</button>
                <button className="bg-gray-100 border-violet-600 border hover:bg-violet-600 text-gray-700 hover:border-violet-300 hover:text-white font-bold py-1 m-1 px-4 rounded-2xl">Done</button>
            </div>

            <div className={`flex-row relative mx-2 bg-white shadow-md rounded-3xl`} style={{ height: '60%' }}>

                <p className='ml-4 font-bold text-3xl text-gray-600'>My tasks:</p>

                <div className="flex flex-col relative items-center overflow-y-auto rounded-3xl overflow-hidden" style={{ height: '90%' }}>
                    
                    
                    <div className="flex flex-col justify-center w-11/12">
                        {/* TaskDetail components */}
                        <TaskDetail status="TO DO" />
                        <TaskDetail status="DONE" />
                        <TaskDetail status="TO DO" />
                        <TaskDetail status="DONE" />     
                    </div>
                </div>    
            </div>

            {/* Add Button */}
            <div className="flex justify-center">
                <button className="bg-violet-600 border hover:bg-violet-300 text-white w-full font-bold py-2 px-4 rounded-full mt-4">Add</button>
            </div>
        </div>
    );
}

export default TaskPanel;
