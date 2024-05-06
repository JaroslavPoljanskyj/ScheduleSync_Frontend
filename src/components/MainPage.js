import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import NavigationBar from './NavigationBar';
import SchedulePanel from './SchedulePanel';
import TaskPanel from './TaskPanel';
import ScheduleDataProvider from './scheduleDataProvider';

function MainPage() {
  return (
    <div className="container h-full w-full flex flex-col bg-violet-100 px-4">
      <ScheduleDataProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/schedulePanel" />} />
            <Route path="/schedulePanel" element={<SchedulePanel />} />
            <Route path="/taskPanel" element={<TaskPanel />} />
          </Routes>
        </Router>
        <NavigationBar />
      </ScheduleDataProvider>
    </div>
  );
}

export default MainPage;
