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

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider initialState={initialState} reducer={authReducer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
              <Route index element={<Schedual />} /> 
              <Route path="/editEE" element={<Edit/>} />
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
