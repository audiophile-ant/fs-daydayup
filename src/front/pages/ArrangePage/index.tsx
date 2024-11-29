import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/navagation';
import TodoPage from './TodoPage';
import MemoPage from './MemoPage';
import HabitsPage from './HabitsPage';
import PlanningPage from './PlanningPage';

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
    	  <Route path="habits" element={<HabitsPage />} />
    	  <Route path="planning" element={<PlanningPage />} />
				<Route path="/" element={<Navigate to="habits" />} />     
    	</Routes>	
    </>
  );
}

export default ArrangePage;