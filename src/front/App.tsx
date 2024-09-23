import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter  as Router, Navigate,Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LaunchPage from './pages/LaunchPage';

const App: React.FC = () => {
  const [isLaunched, setIsLaunched] = useState<boolean>(true);


  useEffect(() => {
    // const storedIsLaunched = localStorage.getItem('isLaunched');
    // setIsLaunched(storedIsLaunched === 'true');
  }, []);

  return (
		<Router>
      <Routes>
        <Route path="/" element={isLaunched ? <HomePage /> : <Navigate to="/launch" />} />
        <Route path="/launch" element={<LaunchPage />} />
      </Routes>
    </Router>
  );
};

export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);