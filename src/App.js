import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './features/Navbar';
import Container from './features/Container';


function App() {
  

  return (
    <Navbar />,
    <Container>
      <h1>Welcome to Ticketto</h1>
    </Container>
  );
}

export default App;
