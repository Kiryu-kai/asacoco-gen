import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import './common.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
      <Header />
      <App />
      <Footer />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
