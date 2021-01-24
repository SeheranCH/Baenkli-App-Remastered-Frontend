import React from 'react';
import Router from "./components/other/router/Router";
import { SessionHandlerContextProvider } from './components/other/context/SessionHandlerContext';

export default function App() {
  return (
    <SessionHandlerContextProvider>
      <Router />
    </SessionHandlerContextProvider>

  );
};
