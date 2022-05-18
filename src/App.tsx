import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import React from 'react';
import './App.scss';
import MainLayout from "./layouts/MainLayout"
import StatesPage from "./components/StatesPage/StatesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisciplinesPage from "./components/DisciplinesPage/DisciplinesPage";
import DisciplineAddPage from "./components/DisciplineAddPage/DisciplineAddPage";
import DisciplineEditPage from "./components/DisciplineEditPage/DisciplineEditPage";
import LogsPage from "./components/LogsPage/LogsPage";
import ShowLogsPage from "./components/ShowLogsPage/ShowLogsPage";

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
          <Routes>
              <Route path="/" element={<MainLayout />} >
                  <Route index element={<StatesPage />} />
                  <Route path="disciplines" element={<DisciplinesPage />} />
                  <Route path="logs" element={<LogsPage />} />
                  <Route path="logs/user/:userID" element={<ShowLogsPage />} />
                  <Route path="disciplines/:dialogID" element={<DisciplineEditPage />} />
                  <Route path="new-discipline" element={<DisciplineAddPage />} />
                  <Route path="*" element={<StatesPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
