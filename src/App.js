import { useDispatch, useSelector } from 'react-redux';
//import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './features/Navbar';
import Container from './features/Container';
import Login_Register from './features/Login_Register';
import GlobalStyle from './features/GlobalStyle';
import { fetchProducts } from './features/Product/actions';
import ConcertDetailPage from './features/ConcertDetail/ConcertDetailPage'
import { Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import SelectTicket from './features/GetTicket/GetTicketPage';
import ScrollToTop from "./features/ScrollToTop";
import PaymentPage from './features/Payment/PaymentPage';
import ProfilePage from './features/Profile/ProfilePage';

function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        console.log("✅ Fetched data from API:", data);
        dispatch(fetchProducts(data));
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, [dispatch]);
  return (
    <>
      <GlobalStyle />
      <Navbar currentUser={currentUser} />
      <Container>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home products={products}/>} />
          <Route path="/concert-detail/:id" element={<ConcertDetailPage/>} />
          <Route path="/login" element={<Login_Register />} />
          <Route path="/select-ticket/:id" element={<SelectTicket /> } />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
          
        </Routes>
      </Container>
    </>
  );
}

export default App;
