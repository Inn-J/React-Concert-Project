import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";

function TicketSelector({ prices = [], onChange, className }) {
  // เก็บจำนวนต่อรายการ เช่น [0,2,1,...]
  const [quantities, setQuantities] = useState(() => prices.map(() => 0));

  // รีเซ็ตจำนวนเมื่อรายการเปลี่ยน
  useEffect(() => {
    setQuantities(prices.map(() => 0));
  }, [prices]);

  // แจ้งผลออกไปเมื่อ quantities เปลี่ยน
  useEffect(() => {
    const selected = prices
      .map((p, i) => ({ ...p, qty: quantities[i] }))
      .filter((it) => it.qty > 0);
    onChange?.(selected);
  }, [quantities, prices, onChange]);

  const updateQty = (index, next) => {
    setQuantities((prev) => {
      const max = 5
      const safe = Math.max(0, Math.min(next, max));
      if (safe === prev[index]) return prev;
      const copy = [...prev];
      copy[index] = safe;
      return copy;
    });
  };

  const inc = (idx) => updateQty(idx, quantities[idx] + 1);
  const dec = (idx) => updateQty(idx, quantities[idx] - 1);
  

  const subtotalOf = (p, q) => Number(p.amount || 0) * Number(q || 0);

  return (
    <div className={className}>
      <ul className="ticket-list">
        {prices.map((price, index) => {
          const qty = quantities[index] ?? 0;
          const amount = Number(price.amount || 0);
          const maxQty = 5;

          return (
            <li key={index} className={`ticket-item ${qty > 0 ? "active" : ""}`}>
              <div className="ticket-info">
                <span className="ticket-option">{price.option}</span>
                <span className="ticket-price">
                  {amount.toLocaleString()} บาท
                </span>
              </div>

              <div className="qty-group" aria-label={`จำนวน ${price.option}`}>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => dec(index)}
                  disabled={qty <= 0}
                  aria-label="ลดจำนวน"
                >
                  −
                </button>
                
                <span>{qty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => inc(index)}
                  disabled={qty >= maxQty}
                  aria-label="เพิ่มจำนวน"
                >
                  +
                </button>
              </div>

              <div className="line-total" aria-label="ราคารวมรายการนี้">
                {subtotalOf(price, qty).toLocaleString()} บาท
              </div>
            </li>
          );
        })}
      </ul>

      {/* สรุปรวมทั้งหมด (ถ้าอยากเอาออกลบส่วนนี้ได้) */}
      <div className="summary">
        <span>
          รายการที่เลือก:{" "}
          {quantities.reduce((a, b) => a + (b > 0 ? 1 : 0), 0)} รายการ
        </span>
        <span className="summary-total">
          รวมทั้งหมด:{" "}
          {prices
            .reduce(
              (sum, p, i) => sum + Number(p.amount || 0) * Number(quantities[i] || 0),
              0
            )
            .toLocaleString()}{" "}
          บาท
        </span>
      </div>
    </div>
  );
}

TicketSelector.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      maxQty: PropTypes.number, // ถ้ามีจำกัดจำนวนต่อรายการ
    })
  ),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default styled(TicketSelector)`
  .ticket-list {
    list-style: none;
    padding: 0;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ticket-item {
    display: grid;
    grid-template-columns: 1fr auto auto; /* ข้อมูล | จำนวน | รวม */
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-radius: 10px;
    border: 2px solid #ddd;
    background: #fff;
    transition: border-color .2s, background-color .2s, box-shadow .2s;
  }

  .ticket-item:hover {
    border-color: #FF8B59;
    background-color: #FFF3EC;
  }

  .ticket-item.active {
    border-color: #40B9AC;
    background-color: #F2FFFD;
    box-shadow: 0 0 0 3px rgba(64,185,172,.12) inset;
  }

  .ticket-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .ticket-option { font-weight: 700; }
  .ticket-price  { font-weight: 600; color: #333; opacity: .9; }

  .qty-group {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 6px 8px;
    background: #fafafa;
  }

  .qty-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: #FF8B59;
    color: #fff;
    font-weight: 800;
    font-size: 18px;
    line-height: 0;
  }
  .qty-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

  .qty-group span {
    width: 64px;
    text-align: center;
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-weight: 700;
  }

  .line-total {
    font-weight: 800;
    justify-self: end;
  }

  .summary {
    margin-top: 16px;
    padding: 12px 16px;
    border-top: 1px dashed #e8e8e8;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }

  @media (max-width: 600px) {
    .ticket-item {
      grid-template-columns: 1fr 1fr; /* ข้อมูล | จำนวน ; รวมลงบรรทัดใหม่ */
    }
    .line-total {
      grid-column: 1 / -1;
      justify-self: end;
    }
  }
`;
