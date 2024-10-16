import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/navagation';
import TodoPage from './TodoPage';
import MemoPage from './MemoPage';
import RoutinePage from './RoutinePage';
import HolidayPage from './HolidayPage';

const ArrangePage = () => {
	useEffect(() => {
		console.log('ArrangePage')
	})
  return (
    <>
			<Navbar />
			<Routes>
    	  <Route path="todo" element={<TodoPage />} />
    	  <Route path="memo" element={<MemoPage />} />
    	  <Route path="routine" element={<RoutinePage />} />
    	  <Route path="holiday" element={<HolidayPage />} />
				<Route path="/" element={<Navigate to="todo" />} />
    	</Routes>
    </>
  );
}

export default ArrangePage;