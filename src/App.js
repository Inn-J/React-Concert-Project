import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './features/Navbar';
import Container from './features/Container';
import Login_Register from './features/Login_Register';


function App() {
  

  return (
    <Navbar />,
    <Container>
      <Login_Register />
      <h1>Welcome to Ticketto</h1>
    </Container>
  );
}

export default App;
