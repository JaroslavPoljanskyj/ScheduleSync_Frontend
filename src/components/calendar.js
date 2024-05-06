import React, { useState, useEffect } from 'react';

const CalendarComponent = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth, selectedDate]);

  const generateCalendar = (year, month) => {
    const calendarElement = document.getElementById('calendar');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Create a date object for the first day of the specified month
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Clear the calendar
    calendarElement.innerHTML = '';
    
    // Set the current month text
    document.getElementById('currentMonth').innerText = `${monthNames[month]} ${year}`;
    
    // Create headers for the days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.className = 'text-center font-semibold';
      dayElement.innerText = day;
      calendarElement.appendChild(dayElement);
    });

    // Create empty boxes for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDayElement = document.createElement('div');
      calendarElement.appendChild(emptyDayElement);
    }

    // Create boxes for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'text-center py-2 border cursor-pointer rounded-full';

      // Check if this date is the selected date
      if (selectedDate && year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate()) {
        dayElement.classList.add('bg-violet-500', 'text-white');
      }

      dayElement.innerText = day;
      dayElement.addEventListener('click', () => {
        const clickedDate = new Date(year, month, day);
        setSelectedDate(clickedDate);
      });

      calendarElement.appendChild(dayElement);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      let newMonth = prevMonth - 1;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      let newMonth = prevMonth + 1;
      let newYear = currentYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12">
        <div className="bg-violet-100 shadow-lg rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-violet-700 cursor-pointer" onClick={toggleCalendarVisibility}>
            <button onClick={handlePrevMonth} className="text-white">Previous</button>
            <h2 id="currentMonth" className="text-white"></h2>
            <button onClick={handleNextMonth} className="text-white">Next</button>
          </div>
          <div className={`grid grid-cols-7 gap-2 p-4 ${isCalendarVisible ? '' : 'hidden'}`} id="calendar"></div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
