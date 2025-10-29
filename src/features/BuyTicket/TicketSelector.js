import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const MAX_TOTAL_QTY = 4;

function TicketSelector({ prices = [], onChange, className }) {
  // เก็บจำนวนต่อรายการ เช่น [0,2,1,...]
  const [quantities, setQuantities] = useState(() => prices.map(() => 0));

  // อัปเดต onChange ลงใน ref เพื่อให้ callback เสถียร
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // รีเซ็ตจำนวนเมื่อรายการเปลี่ยน
  useEffect(() => { setQuantities(prices.map(() => 0)); }, [prices]);

  // คำนวณยอดรวมจำนวนบัตรทั้งหมด
  const totalQty = quantities.reduce((sum, q) => sum + (Number(q) || 0), 0);
  const remaining = Math.max(0, MAX_TOTAL_QTY - totalQty);

  // guard กัน call ซ้ำเมื่อ selected ไม่ได้เปลี่ยนจริง
  const lastSelectedKeyRef = useRef("");
  useEffect(() => {
    const selected = prices
      .map((p, i) => ({ ...p, qty: quantities[i] }))
      .filter((it) => Number(it.qty) > 0);
    const key = JSON.stringify(selected);
    if (key !== lastSelectedKeyRef.current) {
      lastSelectedKeyRef.current = key;
      onChangeRef.current?.(selected);
    }
  }, [quantities, prices]);

  // อัปเดตจำนวน พร้อมลิมิตรายรายการ + ลิมิตรวมทุกช่อง
  const updateQty = (index, nextDesired) => {
    setQuantities((prev) => {
      const perItemMax = Number(prices[index]?.maxQty ?? 5);
      const current = Number(prev[index] ?? 0);

      // ยอดรวมของช่องอื่น ๆ (ไม่รวมช่องที่กำลังแก้)
      const othersTotal = prev.reduce((s, q, i) => (i === index ? s : s + (Number(q) || 0)), 0);
      const globalRemainingForThis = Math.max(0, MAX_TOTAL_QTY - othersTotal);

      // ทำให้เป็นเลขปลอดภัยภายใต้ข้อจำกัด
      let safe = Math.max(0, Math.min(Number(nextDesired) || 0, perItemMax, globalRemainingForThis));

      // ถ้าไม่เปลี่ยนจริง ไม่ต้องอัปเดต state
      if (safe === current) return prev;

      const copy = [...prev];
      copy[index] = safe;
      return copy;
    });
  };

  const inc = (idx) => updateQty(idx, (quantities[idx] ?? 0) + 1);
  const dec = (idx) => updateQty(idx, (quantities[idx] ?? 0) - 1);

  const subtotalOf = (p, q) => Number(p.amount || 0) * Number(q || 0);

  return (
    <div className={className}>
      <ul className="ticket-list">
        {prices.map((price, index) => {
          const qty = quantities[index] ?? 0;
          const amount = Number(price.amount || 0);
          const perItemMax = Number(price.maxQty ?? 5);

          // disable ปุ่ม + ถ้าถึง per-item หรือถึงลิมิตรวม (MAX_TOTAL_QTY)
          const disablePlus =
            qty >= perItemMax || totalQty >= MAX_TOTAL_QTY;

          return (
            <li key={index} className={`ticket-item ${qty > 0 ? "active" : ""}`}>
              <div className="ticket-info">
                <span className="ticket-option">{price.option}</span>
                <span className="ticket-price">{amount.toLocaleString()} บาท</span>
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
                  disabled={disablePlus}
                  aria-label="เพิ่มจำนวน"
                  title={
                    disablePlus && totalQty >= MAX_TOTAL_QTY
                      ? `ถึงลิมิตรวม ${MAX_TOTAL_QTY} ใบแล้ว`
                      : undefined
                  }
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

      <div className="summary">
        <div className="summary-left">
          <div>รวมจำนวนบัตร: <strong>{totalQty}</strong> ใบ</div>
        </div>
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
      maxQty: PropTypes.number,
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
  .ticket-limit  { font-size: 12px; color: #666; }

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
    align-items: center;
    font-weight: 700;
    gap: 12px;
  }
  .summary-left {
    display: grid;
    gap: 4px;
  }
  .summary .hint {
    font-weight: 500;
    font-size: 13px;
    color: #666;
  }

  @media (max-width: 600px) {
    .ticket-item {
      grid-template-columns: 1fr 1fr; /* ข้อมูล | จำนวน ; รวมลงบรรทัดใหม่ */
    }
    .line-total {
      grid-column: 1 / -1;
      justify-self: end;
    }
    .summary {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
