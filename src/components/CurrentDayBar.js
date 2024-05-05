import React, { useEffect, useState } from 'react';

function CurrentDayBar({ selectedDay, setSelectedDay }) {

    const [weekStart, setWeekStart] = useState(null);

    useEffect(() => {
        // Set the current week's start date with Monday as the first day
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const mondayDate = new Date(currentDate);
        mondayDate.setDate(mondayDate.getDate() + mondayOffset);
        setWeekStart(mondayDate);

        // Set the current day as selected
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayName = fullDays[currentDate.getDay()];
        setSelectedDay(currentDayName);
    }, []);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        console.log("Selected day:", day);
    };
    

    return (
        <div className='flex bg-white shadow-md justify-around rounded-3xl my-2 mx-2 md:mx-20  overflow-x-auto' style={{ height: '12.5%' }}>
            {/* Day elements */}
            {weekStart && Array.from({ length: 7 }, (_, i) => {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + i);
                const shortDayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
                const fullDayName = dayDate.toLocaleDateString('en-US', { weekday: 'long' });
                return (
                    <DayElement
                        key={i}
                        day={shortDayName}
                        fullDay={fullDayName}
                        date={dayDate.getDate()}
                        selected={selectedDay === fullDayName}
                        onClick={() => handleDayClick(fullDayName)}
                    />
                );
            })}
        </div>
    );
}

// Individual day element component
function DayElement({ day, fullDay, date, selected, onClick }) {
    return (
        <div className={`flex group ${selected ? 'bg-purple-300 shadow-lg dark-shadow' : 'hover:bg-purple-300 hover:shadow-lg hover-dark-shadow'} rounded-2xl mx-1 my-1 transition-all cursor-pointer justify-center flex-grow`} onClick={onClick}>
            <div className='flex items-center px-2 py-2'>
                <div className='text-center'>
                    <p className={`text-gray-900 ${selected ? 'text-slate-500' : 'group-hover:text-gray-100'} text-sm`}>{day}</p>
                    <p className={`text-gray-900 ${selected ? 'text-slate-500 font-bold' : 'group-hover:text-gray-100 mt-3 group-hover:font-bold'}`}>{date}</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentDayBar;
