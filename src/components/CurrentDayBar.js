import React, { useState } from 'react';

function CurrentDayBar() {
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <div className='flex bg-white shadow-md justify-around rounded-3xl my-2 mx-2 md:mx-20  overflow-x-auto' style={{ height: '12.5%' }}>
            {/* Day elements */}
            <DayElement day="Mon" date="12" selected={selectedDay === "Mon"} onClick={() => handleDayClick("Mon")} />
            <DayElement day="Tue" date="13" selected={selectedDay === "Tue"} onClick={() => handleDayClick("Tue")} />
            <DayElement day="Wed" date="14" selected={selectedDay === "Wed"} onClick={() => handleDayClick("Wed")} />
            <DayElement day="Thu" date="15" selected={selectedDay === "Thu"} onClick={() => handleDayClick("Thu")} />
            <DayElement day="Fri" date="16" selected={selectedDay === "Fri"} onClick={() => handleDayClick("Fri")} />
            <DayElement day="Sat" date="17" selected={selectedDay === "Sat"} onClick={() => handleDayClick("Sat")} />
            <DayElement day="Sun" date="11" selected={selectedDay === "Sun"} onClick={() => handleDayClick("Sun")} />
        </div>
    );
}

// Individual day element component
function DayElement({ day, date, selected, onClick }) {
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
