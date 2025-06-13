import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to measure performance in your app, pass a function
// to log results (e.g. reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
