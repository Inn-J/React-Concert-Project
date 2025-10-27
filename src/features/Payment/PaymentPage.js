import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import qrImage from '../../features/Payment/promptpay_qr.jfif';

function PaymentPage({ className }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { concert, ticket } = location.state || {};
  const user = useSelector((state) => state.user);
  const [booked, setBooked] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  // credit card info
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  // promptpay slip
  const [slip, setSlip] = useState(null);

  const totalPrice = (ticket?.amount || 0) * (ticket?.quantity || 1);

  const handleNextStep = () => {
    if (step === 1 && !paymentMethod) {
      alert('กรุณาเลือกวิธีการชำระเงิน');
      return;
    }

    if (step === 2) {
      if (paymentMethod === 'Credit Card' && (!cardInfo.name || !cardInfo.number || !cardInfo.expiry || !cardInfo.cvv)) {
        alert('กรุณากรอกข้อมูลบัตรให้ครบถ้วน');
        return;
      }

      if (paymentMethod === 'PromptPay' && !slip) {
        alert('กรุณาอัปโหลดสลิปการชำระเงิน');
        return;
      }
    }

    setStep(step + 1);
  };

  const handleBackStep = () => setStep((prev) => Math.max(1, prev - 1));

  const handlePayment = async () => {
    try {
      const confirmed = window.confirm(
        `ยอดชำระ: ${totalPrice.toLocaleString()} บาท\nวิธีชำระ: ${paymentMethod}\nยืนยันชำระเงิน?`
      );
      if (!confirmed) return;

      const bookingData = {
        concertId: id,
        concertName: concert.name,
        ticketOption: ticket.option,
        quantity: ticket.quantity,
        totalPrice,
        userName: user.name,
        email: user.email,
        paymentMethod,
        date: new Date().toISOString(),
        ...(paymentMethod === 'Credit Card' ? { cardInfo } : {}),
        ...(paymentMethod === 'PromptPay' ? { slipUploaded: !!slip } : {}),
      };

      await axios.post('http://localhost:4000/bookings', bookingData);
      setBooked(true);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกการจอง');
    }
  };

  if (!concert || !ticket) {
    return <div className={className}>❌ ไม่มีข้อมูลการจอง</div>;
  }

  const productImage = require(`../../assets/${concert.image}`);

  return (
    <div className={className}>
      {/* ส่วนภาพ + รายละเอียดคอนเสิร์ต */}
      <div className="concert-card">
        <img src={productImage} alt={concert.name} className="concert-img" />
        <div className="concert-info">
          <p className="category">Concert/Musical</p>
          <h2>{concert.name}</h2>
          <p><strong>วันที่:</strong> {concert.date}</p>
          <p><strong>เวลา:</strong> {concert.time}</p>
          <p><strong>สถานที่:</strong> {concert.location}</p>
        </div>
      </div>

      {/* ส่วนข้อมูลการชำระเงิน */}
      <div className="payment-content">
        <h1>💳 Payment Details</h1>

        <div className="summary">
          <h3>{concert.name}</h3>
          <p><strong>Ticket:</strong> {ticket.option}</p>
          <p><strong>Quantity:</strong> {ticket.quantity}</p>
          <p><strong>Total:</strong> {totalPrice.toLocaleString()} บาท</p>
        </div>

        {/* STEP 1 - เลือกวิธีชำระ */}
        {step === 1 && (
          <div className="payment-method">
            <h3>เลือกวิธีการชำระเงิน</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">-- เลือกวิธีชำระ --</option>
              <option value="Credit Card">บัตรเครดิต</option>
              <option value="PromptPay">PromptPay</option>
            </select>
            <div className="btn-group">
              <button onClick={() => navigate(-1)}>ย้อนกลับ</button>
              <button onClick={handleNextStep}>ถัดไป</button>
            </div>
          </div>
        )}

        {/* STEP 2 - กรอกข้อมูลตามประเภท */}
        {step === 2 && (
          <>
            {paymentMethod === 'Credit Card' && (
              <div className="credit-form">
                <h3>ข้อมูลบัตรเครดิต</h3>
                <input
                  type="text"
                  placeholder="ชื่อบนบัตร"
                  value={cardInfo.name}
                  onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="หมายเลขบัตร 16 หลัก"
                  value={cardInfo.number}
                  onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                />
                <div className="card-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardInfo.expiry}
                    onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'PromptPay' && (
              <div className="promptpay-section">
                <h3>ชำระผ่าน PromptPay</h3>
                <img src={qrImage} alt="PromptPay QR" className="qr-img" />
                <p>สแกน QR นี้เพื่อชำระเงิน {totalPrice.toLocaleString()} บาท</p>
                <label htmlFor="slipUpload">📎 อัปโหลดสลิปการชำระเงิน:</label>
                <input
                  id="slipUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSlip(e.target.files[0])}
                />
                {slip && <p>✅ อัปโหลดแล้ว: {slip.name}</p>}
              </div>
            )}

            <div className="btn-group">
              <button onClick={handleBackStep}>ย้อนกลับ</button>
              <button onClick={handleNextStep}>ถัดไป</button>
            </div>
          </>
        )}

        {/* STEP 3 - ยืนยันการชำระ */}
        {step === 3 && !booked && (
          <div className="confirm-payment">
            <p>คุณเลือกวิธีชำระ: <strong>{paymentMethod}</strong></p>
            <div className="btn-group">
              <button onClick={handleBackStep}>ย้อนกลับ</button>
              <button onClick={handlePayment}>ยืนยันชำระเงิน</button>
            </div>
          </div>
        )}

        {booked && (
          <p className="success">
            ✅ ชำระเงินสำเร็จ! ระบบได้บันทึกคำสั่งซื้อของคุณแล้ว
          </p>
        )}
      </div>
    </div>
  );
}

export default styled(PaymentPage)`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .concert-card {
    display: flex;
    align-items: center;
    background: #fff8f5;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 0 12px rgba(0,0,0,0.1);
  }

  .concert-img {
    width: 300px;
    height: 100%;
    object-fit: cover;
  }

  .concert-info {
    flex: 1;
    padding: 24px;
  }

  .category {
    color: teal;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .payment-content {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 0 15px rgba(0,0,0,0.15);
    padding: 30px;
  }

  .summary {
    background: #ffe8de;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 25px;
    text-align: center;
  }

  input[type="text"], input[type="file"], select {
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 12px;
  }

  .card-row {
    display: flex;
    gap: 10px;
  }

  .promptpay-section {
    text-align: center;
  }

  .qr-img {
    width: 320px;
    height: auto;
    display: block;
    margin: 20px auto;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
    }

  .btn-group {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  button {
    flex: 1;
    background: linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .success {
    margin-top: 20px;
    color: green;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
  }
`;
