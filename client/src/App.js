import React from 'react';
import './App.css';

// Main
import Main from './component/main/Main'

// Navbar
import Navbar from './component/navbar/Navbar'

// Footer
import Footer from './component/footer/Footer'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
