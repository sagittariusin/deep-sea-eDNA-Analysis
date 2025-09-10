import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorldMap from './components/WorldMap';
import DataPortal from './components/DataPortal';
import ProcessOverview from './components/ProcessOverview';
import FileUploader from './components/FileUploader';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <WorldMap />
        <DataPortal />
        <ProcessOverview />
        <FileUploader />
      </main>
      <Footer />
    </div>
  );
}

export default App;