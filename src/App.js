import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import your route components too

// import Screens
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import CreateUser from './pages/CreateUser';

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="create-user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}