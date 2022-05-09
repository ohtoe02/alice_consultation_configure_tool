import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import StatesPage from "./components/StatesPage/StatesPage";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import DialogsPage from "./components/DialogsPage/DialogsPage";

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
      <BrowserRouter>
          <Header />
          <div>
              <Routes>
                  <Route path="/" element={<StatesPage />} />
                  <Route path="dialogs/" element={<DialogsPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
