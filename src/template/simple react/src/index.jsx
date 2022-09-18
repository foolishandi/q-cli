import React, {createContext} from 'react';
import reactDom from 'react-dom/client';
import setupLocatorUI from '@locator/runtime';
import {BrowserRouter} from 'react-router-dom';
import App from './pages/App';

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI();
}
const container = document.getElementById('root');

const root = reactDom.createRoot(container);

root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
);
