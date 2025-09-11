import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import LoginWrapper from './components/LoginWrapper';  // Import the wrapper

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWrapper />} />  {/* Use the wrapper here */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
