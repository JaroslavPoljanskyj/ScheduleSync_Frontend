import React, { useState } from 'react';

export default function TaskDetail({ status }) {
  const [isDone, setIsDone] = useState(status === 'DONE');
  const [statusText, setStatusText] = useState(isDone ? 'DONE' : 'TO DO');
  const [statusColor, setStatusColor] = useState(isDone ? 'text-green-500' : 'text-red-500');

  const handleStatusChange = () => {
    setIsDone(!isDone);
    setStatusText(isDone ? 'TO DO' : 'DONE');
    setStatusColor(isDone ? 'text-red-500' : 'text-green-500');
  };

  return (
    <div className="w-full mx-auto border border-violet-300 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-1 relative">
      <div className="p-4 flex items-center">
        <div style={{ width: '30%' }}>
          <p className="text-4xl font-bold">18th</p>
        </div>
        <div style={{ width: '40%' }}>
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Task name</div>
            <p className="mt-2 text-gray-500 text-sm">9:20 AM - 9:40 AM</p>
            <p className="mt-2 text-gray-500">Task Details...</p>
          </div>
        </div>
        <div style={{ width: '30%' }}>
          <div className="mt-2 flex justify-end">
            <span className={`text-sm font-semibold cursor-pointer ${statusColor}`} onClick={handleStatusChange}>{statusText} {isDone ? '<<' : '>>'}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 cursor-pointer text-gray-500">X</div>
    </div>
  );
}
