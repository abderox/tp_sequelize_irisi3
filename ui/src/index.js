import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Commands from './pages/commands';
import Bookery from './pages/bookery';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/commands" element={<Commands />} />
          <Route path="/bookery" element={<Bookery />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode >
);

