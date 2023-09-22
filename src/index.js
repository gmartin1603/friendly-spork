import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './components/Edit';
import Schedual from './components/Schedual';
import authReducer, { initialState } from './context/auth/authReducer';
import NotFound from './components/NotFound';
import Postings from './components/Postings';
import ArchPostings from './components/ArchPostings';
import CallinWiz from './components/CallinWiz';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider initialState={initialState} reducer={authReducer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Schedual />} />
            <Route path="/dashboard" element={<Edit />} />
            <Route path="/postings" element={<Postings />} />
            <Route path="/archPostings" element={<ArchPostings />} />
            <Route path="/callinWiz" element={<CallinWiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <NotFound />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <ToastContainer position="top-right" theme='colored' />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
