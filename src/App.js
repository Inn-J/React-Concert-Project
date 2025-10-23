import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './features/Navbar';
import Container from './features/Container';
import Login_Register from './features/Login_Register';
import GlobalStyle from './features/GlobalStyle';
import { fetchProducts } from './features/Product/actions';
import ConcertDetail from './features/ConcertDetail'
import { Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import SelectTicket from './features/SelectTicket';

function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        dispatch(fetchProducts(data));
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/concert-detail/:id" element={<ConcertDetail/>} />
          <Route path="/login" element={<Login_Register />} />
          <Route path="/select-ticket/:id" element={<SelectTicket />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
