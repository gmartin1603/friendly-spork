import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OpApp from './components/OpApp';
import AdminApp from './components/AdminApp';
import Edit from './components/Edit';
import Schedual from './components/Schedual';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="/admin" element={<AdminApp/>}>
              <Route index path="/admin" element={<Schedual />} /> 
              <Route path="/admin/editEE" element={<Edit/>} />
            </Route>
            <Route path="/op" element={<AdminApp/>}>
              <Route index element={<Schedual />} /> 
            </Route>
            <Route path="/ee" element={<AdminApp/>}>
              <Route index element={<Schedual />} /> 
            </Route>
            <Route path="/sup" element={<AdminApp/>}>
              <Route index element={<Schedual />} /> 
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
