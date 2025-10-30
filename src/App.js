import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from './features/Navbar';
import Container from './features/Container';
import Login_Register from './features/Login_Register';
import GlobalStyle from './features/GlobalStyle';
import { fetchConcerts} from './features/Product/actions';
import ConcertDetailPage from './features/ConcertDetail/ConcertDetailPage'
import { useLocation,Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import SelectTicket from './features/BuyTicket/BuyTicketPage';
import ScrollToTop from "./features/ScrollToTop";
import PaymentPage from './features/Payment/PaymentPage';
import ProfilePage from './features/Profile/ProfilePage';
import AdminPage from './features/Admin/AdminPage';
import Adminlogin from './features/Admin/Adminlogin';

function App() {
  const concerts = useSelector((state) => state.concerts);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    async function getConcerts() {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        console.log("✅ Fetched data from API:", data);
        dispatch(fetchConcerts(data));
      } catch (error) {
        console.error(error);
      }
    }

    getConcerts();

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    }, [dispatch]);

    useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      setIsAdminLoggedIn(false);
    }
    }, [location.pathname]);
  return (
    <>
      <GlobalStyle />
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Container>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home products={concerts} />} />
          <Route path="/concert-detail/:id" element={<ConcertDetailPage />} />
          <Route path="/login" element={<Login_Register />} />
          <Route path="/select-ticket/:id" element={<SelectTicket />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/admin" element={ isAdminLoggedIn ? (<AdminPage /> ) : (<Adminlogin setIsAdminLoggedIn={setIsAdminLoggedIn} />)}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
