import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './features/Navbar';
import Container from './features/Container';
import Login_Register from './features/Login_Register';
import GlobalStyle from './features/GlobalStyle';



function App() {
  return (
    <>
    <GlobalStyle/>
    <Navbar />
    </>
  );
}

export default App;
