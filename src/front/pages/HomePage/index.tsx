
import React, { useEffect, useState } from 'react';

import Menu from '../../components/dragNavigation/index'
import { Route, Routes, Navigate } from 'react-router-dom';
import styles from './index.scss'

import ArrangePage from '../ArrangePage';
import UserPage from '../UserPage';



const HomePage = () => {

  return (
		<>
			<div className={styles.menu} />
			<div className={styles.content}>
				<Menu/>
    		<Routes>
    		  <Route path="home" element={<UserPage />} />
    		  <Route path="edit/*" element={<ArrangePage />} />
					<Route path="/" element={<Navigate to="edit" />} />
    		</Routes>
			</div>		
		</>
  );

}

export default HomePage;