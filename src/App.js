import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Navbar from './features/Navbar';
import Container from './features/Container';
import Login_Register from './features/Login_Register';
import GlobalStyle from './features/GlobalStyle';
import { fetchProducts } from './features/Product/actions'; 


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
    <GlobalStyle/>
    <Navbar />
    </>
  );
}

export default App;
