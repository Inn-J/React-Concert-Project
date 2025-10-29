import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ticket } from "lucide-react";

function PaymentCard({ booking, className }) {
  if (!booking) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const thaiMonths = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `คำสั่งซื้อเมื่อวันที่ ${day} ${month} ${year} ${hours}:${minutes}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatBookingId = (id) => {
    return id.toString().padStart(10, '0');
  };

  return (
    <div className={className}>
      <div className="paymentCard">
        <div className="cardLeft">
          <div className="dateSection">
            <span className="dateText">{formatDate(booking.date)}</span>
          </div>
          
          <h4 className="concertName">{booking.concertName}</h4>
          
          <div className="timeSlot">
            รอบ {booking.lineItems[0]?.option || 'N/A'}
          </div>

          <div className="lineItemsSection">
            {booking.lineItems.map((item, index) => (
              <div key={index} className="lineItem">
                <div className="lineItemDetails">
                  <Ticket className="ticketIcon" />
                  <span className="optionText">
                    บัตรเข้างาน {item.option}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="footer">
            <span className="paymentMethod">จ่ายผ่าน {booking.paymentMethod}</span>
          </div>
        </div>

        <div className="cardRight">
          <div className="bookingIdSection">
            <span className="idLabel">หมายเลขคำสั่งซื้อ</span>
            <span className="idNumber">{formatBookingId(booking.bookingId)}</span>
          </div>
          
          <div className="priceSection">
            {booking.lineItems.map((item, index) => (
              <div key={index} className="priceItem">
                <Ticket className="ticketIconSmall" />
                <span>x {item.quantity}</span>
              </div>
            ))}
            <div className="totalPrice">
              <span className="price">{formatPrice(booking.totalPrice)} THB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PaymentCard.propTypes = {
  booking: PropTypes.shape({
    bookingId: PropTypes.number,
    concertId: PropTypes.string,
    concertName: PropTypes.string,
    lineItems: PropTypes.arrayOf(
      PropTypes.shape({
        option: PropTypes.string,
        unitPrice: PropTypes.number,
        quantity: PropTypes.number,
        lineTotal: PropTypes.number,
      })
    ),
    totalQuantity: PropTypes.number,
    totalPrice: PropTypes.number,
    userId: PropTypes.number,
    paymentMethod: PropTypes.string,
    date: PropTypes.string,
    slipUploaded: PropTypes.bool,
  }),
  className: PropTypes.string,
};

export default styled(PaymentCard)`
  .paymentCard {
    display: flex;
    align-items: stretch;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
    min-height: 140px;

    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-4px);
    }
  }

  .cardLeft {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.25rem 1.5rem;
    gap: 0.5rem;

    .dateSection {
      .dateText {
        color: #999;
        font-size: 0.85rem;
      }
    }

    .concertName {
      font-size: 1.05rem;
      font-weight: 600;
      color: #555;
      margin: 0.25rem 0;
      line-height: 1.3;
    }

    .timeSlot {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .lineItemsSection {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin: 0.25rem 0;

      .lineItem {
        .lineItemDetails {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .ticketIcon {
            width: 16px;
            height: 16px;
            color: #999;
            flex-shrink: 0;
          }

          .optionText {
            font-size: 0.85rem;
            color: #666;
            line-height: 1.3;
          }
        }
      }
    }

    .footer {
      margin-top: 0.25rem;
      padding-top: 0.5rem;
      border-top: 1px solid #f0f0f0;

      .paymentMethod {
        font-size: 0.85rem;
        color: #999;
      }
    }
  }

  .cardRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    background: #fafafa;
    border-left: 1px solid #f0f0f0;
    min-width: 180px;

    .bookingIdSection {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-align: right;

      .idLabel {
        color: #999;
        font-size: 0.8rem;
      }

      .idNumber {
        color: #666;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .priceSection {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;

      .priceItem {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: #666;

        .ticketIconSmall {
          width: 16px;
          height: 16px;
          color: #999;
        }
      }

      .totalPrice {
        margin-top: 0.25rem;
        padding-top: 0.5rem;
        border-top: 1px solid #e5e5e5;

        .price {
          font-weight: 600;
          color: #333;
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .paymentCard {
      flex-direction: column;
      min-height: auto;
    }

    .cardLeft {
      padding: 1.5rem;
    }

    .cardRight {
      border-left: none;
      border-top: 1px solid #f0f0f0;
      min-width: auto;
      padding: 1.5rem;

      .bookingIdSection,
      .priceSection {
        align-items: flex-start;
        text-align: left;

        .totalPrice {
          align-self: flex-start;
        }
      }
    }
  }
`;