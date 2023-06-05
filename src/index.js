import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*Importing Routes */
import {LoginView } from "./routes/LoginView";
import { Dashboard } from "./routes/Dashboard";
import { SignOut } from "./routes/SignOut";
import { ToAccess } from "./routes/ToAccess";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element= {<App />}/>
      <Route path='/ToAccess' element= {<ToAccess />}/>
      <Route path='login' element= {<LoginView />}/>
      <Route path='dashboard' element= {<Dashboard />}/>
      <Route path='signout' element= {<SignOut/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
