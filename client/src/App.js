import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./store";

// Main
import Main from './component/main/Main'

// Navbar
import Navbar from './component/navbar/Navbar'

// Footer
import Footer from './component/footer/Footer'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Main />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
