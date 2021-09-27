import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FormProvider } from './context/FormContext';
import { initialState, reducer } from './context/formReducer';

ReactDOM.render(
  <React.StrictMode>
    <FormProvider initialState={initialState} reducer={reducer}>
    <App />
    </FormProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
