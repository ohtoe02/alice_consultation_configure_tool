import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Card from "./components/App/Card/Card";
import Main from "./layouts/main"
import StatesPage from "./components/StatesPage/StatesPage";

const firebaseConfig = {
    apiKey: "AIzaSyC7DIzFCt02mY2KhW8FAmw6n5qp8jTHx38",
    authDomain: "alice-consultation-skill.firebaseapp.com",
    databaseURL: "https://alice-consultation-skill-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alice-consultation-skill",
    storageBucket: "alice-consultation-skill.appspot.com",
    messagingSenderId: "357162755536",
    appId: "1:357162755536:web:02dc7949ad5ed56da705d5",
    measurementId: "G-YKE113SEYB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const App: React.FC = () => {
  return (
      <div>
          <Header />
          <StatesPage />
      </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <div>
    //       Some new text here!
    //     </div>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
