import Home from './Components/Home/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../src/App.css';
import { createContext, useState } from 'react';

export const authContext = createContext();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
  return (
    <>
      <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Home />
      </authContext.Provider>
    </>
  );
}
