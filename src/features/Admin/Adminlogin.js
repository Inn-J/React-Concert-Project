import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function AuthModal({ setIsAdminLoggedIn , className}) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.password) {
      alert('Please fill in all required fields for login.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('❌ ' + data.message);
        return;
      }

      alert('✅ เข้าสู่ระบบสำเร็จ');
      setIsAdminLoggedIn(true)
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดขณะเข้าสู่ระบบ');
    }finally {
        setLoading(false);
    }
  };


    return (
    
    <div className={className}>
        <div className="modal-content">
        <h2 className="modal-title">Admin Login</h2>
        <form onSubmit={handleLoginSubmit}>
            <label>ชื่อผู้ดูแล</label>
            <input
            type="text"
            name="username"
            placeholder="กรอกชื่อผู้ใช้"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
            />
            <label>รหัสผ่าน</label>
            <input
            type="password"
            name="password"
            placeholder="กรอกรหัสผ่าน"
            value={formData.password}
            onChange={handleChange}
            required
            />
            <button type="submit" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
        </form>
        </div>
    </div>
    );
}

export default styled(AuthModal)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* ให้เต็มหน้าจอ */
    padding: 16px;

  .modal-content {
    width: 100%;
    max-width: 400px;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(15, 15, 15, 0.08);
    display: flex;
    flex-direction: column;
  }

  .modal-title {
    margin-bottom: 16px;
    font-size: 1.25rem;
    color: #111827;
    text-align: center;
  }

  label {
    margin-top: 12px;
    margin-bottom: 6px;
    font-size: 0.875rem;
    color: #374151;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #111827;
    background: #fff;
    transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;

    &:focus {
      outline: none;
      border-color: #9CE3DC;
      box-shadow: 0 0 0 4px rgba(156,227,220,0.14);
    }
  }

  button {
    margin-top: 16px;
    padding: 10px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(180deg,#FF7F49,#FFBC6A);
    color: #fff;
    border: none;
    box-shadow: 0 6px 14px rgba(255,127,73,0.08);
    transition: box-shadow 150ms ease, transform 120ms ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 26px rgba(255,124,66,0.12);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  @media (max-width: 576px) {
    .modal-content {
      padding: 16px;
    }
  }
`;