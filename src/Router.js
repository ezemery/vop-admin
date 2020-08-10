import React from 'react';
import {
  BrowserRouter,
} from "react-router-dom";
import App from './App';

const Router = () => {
  return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  );
};

export default Router;