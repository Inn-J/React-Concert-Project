import React, { useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TicketSelector from './TicketSelector';
import HeroCard from '../ConcertDetail/HeroCard';

function GetTicket({ className }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const concert = useSelector((state) =>
    (state.products || []).find((p) => String(p.id) === String(id))
  );

  // เก็บ selections เป็น array
  const [selectedTickets, setSelectedTickets] = useState([]);

  // ทำให้ callback เสถียร ป้องกัน re-run effect ฝั่งลูก
  const handleSelectionChange = useCallback((items) => {
    setSelectedTickets(items);
  }, []);

  const productImage = useMemo(
    () => require(`../../assets/${concert.image}`),
    [concert.image]
  );

  const venueImage = useMemo(() => {
    if (!concert.venueImage) return null;
    try {
      return require(`../../assets/${concert.venueImage}`);
    } catch {
      return null;
    }
  }, [concert.venueImage]);


  if (!concert) return <div className={className}>Not found…</div>;

  
  const grandTotal = selectedTickets.reduce(
    (s, it) => s + Number(it.amount || 0) * Number(it.qty || 0),
    0
  );

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    const handleBooking = () => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบ");
      return;
    }
    if (selectedTickets.length === 0) {
      alert("กรุณาเลือกบัตรก่อนทำการจอง");
      return;
    }

    navigate(`/payment/${concert.id}`, {
      state: { concert, selections: selectedTickets, grandTotal },
    });
  };


  return (
    <div className={className}>
      <section className="hero-section">
        <HeroCard concert={concert} imageSrc={productImage} />
      </section>

      <h1>Choose Ticket</h1>

      {venueImage && (
        <img className="ConcertVenue__image" src={venueImage} alt={concert.name || 'Concert'} />
      )}

      <h2>Ticket Price</h2>
      <p>{concert.description?.[0]?.ticket}</p>

      <TicketSelector prices={concert.prices} onChange={handleSelectionChange} />

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
      <button type="button" className="booking__btn" onClick={handleBooking}>Booking</button>
      </div>
    </div>
  );
}

export default styled(GetTicket)`
  padding:  24px 24px;
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 5px;

  .hero-section {
 background: radial-gradient(ellipse 80% 80% at 50% -20%, 
    rgba(255, 138, 128, 0.95), 
    rgba(255, 184, 140, 0.85) 40%, 
    rgba(255, 216, 140, 0.7) 70%, 
    rgba(255, 232, 222, 1) 100%);
  width: 100vw;
  height: 550px;
  margin-left: calc(50% - 50vw);
  background-size: cover;       /* ครอบเต็ม */
  background-position: center;  /* จัดกึ่งกลาง */
  background-repeat: no-repeat; /* ไม่วนซ้ำ */
  padding: 80px 12px;           /* ขนาดพื้นที่ hero */
  text-align: center;
  color: #000000;
  display: flex;                /* ✅ ใช้ flex ให้อยู่กลาง */
  justify-content: center;
  align-items: center;
  }
  

  .ConcertVenue__image {
    width: 100%;
    height: auto;
    max-width: 520px;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 auto;
    display: block;
  }

  p {
    margin-top: 1px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.5;
    max-width: 730px;
    text-align: left;
  }  

  .booking__btn {
  bottom: 24px;
  right: 24px;
  background: linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

`;
