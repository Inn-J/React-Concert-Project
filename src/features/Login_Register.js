import React, { useState } from 'react';
import styled from 'styled-components';

function AuthModal({ className }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
  });

  const [isLoginView, setIsLoginView] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ------------------ LOGIN ------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('❌ ' + data.message);
        return;
      }

      // Save user to localStorage
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      alert(`✅ Welcome back, ${data.user.name}!`);

      // Redirect to home
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดขณะเข้าสู่ระบบ');
    }
  };

  // ------------------ REGISTER ------------------
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.phone
    ) {
      alert('Please fill in all required fields for registration.');
      return;
    }

    const newUser = {
      name: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('❌ ' + data.message);
        return;
      }

      alert('✅ Registered successfully!');
      setIsLoginView(true); // กลับไปหน้า login
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดขณะสมัครสมาชิก');
    }
  };



    return (
        // The parent container manages the conditional display of the two forms
        <div className={`${className || ''} auth-modal-wrapper`}>
            {/* -------------------- LOGIN FORM -------------------- */}
            <div className={`modal-content signin-body px-2 ${isLoginView ? '' : 'hide'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">เข้าสู่ระบบ</h2>
                </div>

                <div className="modal-body pt-0">
                    <div className="form-login">
                        <form
                            className="simple_form new_user"
                            id="new_user_login"
                            action="/users/sign_in"
                            method="post"
                            onSubmit={handleLoginSubmit}
                        >
                            {/* Inputs use the name property corresponding to the formData state keys */}
                            <div className="form-inputs">
                                <div className="form-group email required user_email">
                                    <label className="control-label email required" htmlFor="user_email_login">
                                        <abbr title="จำเป็น"></abbr> อีเมล
                                    </label>
                                    <input
                                        className="form-control string email required"
                                        type="email"
                                        name="email" // Use 'email' key from formData
                                        id="user_email_login"
                                        placeholder="กรอกอีเมล"
                                        required
                                        autoFocus
                                        aria-required="true"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group password required user_password">
                                    <label className="control-label password required" htmlFor="user_password_login">
                                        <abbr title="จำเป็น"></abbr> รหัสผ่าน
                                    </label>
                                    <input
                                        className="form-control password required"
                                        type="password"
                                        name="password" // Use 'password' key from formData
                                        id="user_password_login"
                                        placeholder="กรอกรหัสผ่าน"
                                        required
                                        aria-required="true"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="spacer-sm"></div>
                    <div className="small form-actions mb-0">
                        <div className="pt-2 hidden-xs"></div>
                        ยังไม่ได้เป็นสมาชิก?
                        {/* Toggle button: sets isLoginView to false to show the registration form */}
                        <a href="#" className="show-signup pl-2" onClick={(e) => { e.preventDefault(); setIsLoginView(false); }}>
                            สมัครสมาชิก
                        </a>
                    </div>
                </div>
            </div>

            {/* -------------------- REGISTRATION FORM -------------------- */}
            <div className={`modal-content signup-body px-2 ${isLoginView ? 'hide' : ''}`}>
                <div className="modal-header">
                    <h2 className="modal-title">สมัครสมาชิก</h2>
                </div>
                <div className="modal-body">
                    <form
                        className="simple_form registration_new need-html5-validation"
                        id="new_user_registration"
                        action="/users"
                        method="post"
                        onSubmit={handleRegisterSubmit}
                    >
                        <div className="form-inputs">
                            {/* Email field for registration */}
                            <div className="form-group email required user_email">
                                <label className="control-label email required" htmlFor="user_email_reg">
                                    <abbr title="จำเป็น"></abbr> อีเมล
                                </label>
                                <input
                                    className="form-control string email required"
                                    required
                                    aria-required="true"
                                    placeholder="กรอกอีเมล"
                                    type="email"
                                    name="email"
                                    id="user_email_reg"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password field for registration */}
                            <div className="form-group password required user_password">
                                <label className="control-label password required" htmlFor="user_password_reg">
                                    <abbr title="จำเป็น"></abbr> รหัสผ่าน
                                </label>
                                <input
                                    className="form-control password required"
                                    required
                                    aria-required="true"
                                    placeholder="กรอกรหัสผ่าน"
                                    type="password"
                                    name="password"
                                    id="user_password_reg"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* First Name field */}
                            <div className="form-group string required user_firstname">
                                <label className="control-label string required" htmlFor="user_firstname">
                                    <abbr title="จำเป็น"></abbr> ชื่อ
                                </label>
                                <input
                                    className="form-control string required"
                                    required
                                    aria-required="true"
                                    placeholder="ตามที่ปรากฏในบัตรประชาชนหรือหนังสือเดินทาง"
                                    type="text"
                                    name="firstname"
                                    id="user_firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Last Name field */}
                            <div className="form-group string required user_lastname">
                                <label className="control-label string required" htmlFor="user_lastname">
                                    <abbr title="จำเป็น"></abbr> นามสกุล
                                </label>
                                <input
                                    className="form-control string required"
                                    required
                                    aria-required="true"
                                    placeholder="ตามที่ปรากฏในบัตรประชาชนหรือหนังสือเดินทาง"
                                    type="text"
                                    name="lastname"
                                    id="user_lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Phone Number field */}
                            <div className="row">
                                <p className="popover-content-phone-info hidden">
                                    <small>เราจะทำการติดต่อคุณผ่านเบอร์นี้ หากมีการจัดส่งบัตรแข็ง หรือ บัตร SMS</small>
                                </p>
                                <div className="col-md-12">
                                    <div className="form-group tel required user_phone">
                                        <label className="control-label tel required" htmlFor="user_phone">
                                            <abbr title="จำเป็น"></abbr> เบอร์โทรศัพท์มือถือ
                                            <a className="text-muted" data-trigger="hover" data-toggle="popover-info" data-popover="prepared-content" data-placement="auto" data-popover-target-title=".popover-title-phone-info" data-popover-target-content=".popover-content-phone-info" href="" title="">
                                                <i className="far fa-info-circle"></i>
                                            </a>
                                        </label>

                                        <div className="intl-tel-input full-width">
                                            <input
                                                className="form-control tel required"
                                                required
                                                aria-required="true"
                                                type="tel"
                                                name="phone"
                                                id="user_phone"
                                                placeholder="08X XXX XXXX"
                                                value={formData.phone}
                                                onChange={handleChange} // pass event handler directly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- SUBMIT BUTTON --- */}
                            <div className="form-actions">
                                <input
                                    type="submit"
                                    name="commit"
                                    value="สมัครสมาชิก"
                                    className="btn btn-primary btn-block"
                                    data-disable-with="สมัครสมาชิก"
                                />
                            </div>

                            <div className="small form-actions mt-3">
                                เป็นสมาชิกอยู่แล้ว?
                                {/* Toggle button: sets isLoginView to true to show the login form */}
                                <a href="#" className="show-login pl-2" onClick={(e) => { e.preventDefault(); setIsLoginView(true); }}>
                                    เข้าสู่ระบบ
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default styled(AuthModal)`
  /* Layout */
  display: block;
  .auth-modal-wrapper {
    max-width: 480px;
    margin: 24px auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color: #242424;
    line-height: 1.4;
  }

  .modal-content {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(15, 15, 15, 0.08);
    padding: 18px;
    border: 1px solid rgba(0,0,0,0.04);
  }

  .hide {
    display: none !important;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(0,0,0,0.04);
  }

  .modal-title {
    font-size: 1.125rem;
    margin: 0;
    color: #111827;
  }

  .close {
    background: transparent;
    border: 0;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    color: #6b7280;
  }

  /* Forms */
  .form-inputs {
    margin-top: 8px;
  }

  label.control-label {
    display: block;
    margin-bottom: 6px;
    font-size: 0.875rem;
    color: #374151;
  }

  input.form-control,
  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="tel"] {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #111827;
    background: #fff;
    transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
  }

  /* ใช้สี #9CE3DC สำหรับโฟกัสและเงา (ต้องมีสีนี้ตามคำขอ) */
  input.form-control:focus {
    outline: none;
    border-color: #9CE3DC;
    box-shadow: 0 0 0 4px rgba(156,227,220,0.14);
  }

  .btn {
    display: inline-block;
    width: 100%;
    padding: 10px 14px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: box-shadow 150ms ease, transform 120ms ease;
  }

  /* ปรับปุ่มหลักเป็น gradient จาก #FF7F49 -> #FFBC6A */
  .btn-primary {
    background: linear-gradient(180deg,#FF7F49,#FFBC6A);
    color: #fff;
    border: none;
    box-shadow: 0 6px 14px rgba(255,127,73,0.08);
  }
  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(255,124,66,0.12);
  }
  .btn-primary:focus {
    outline: none;
    box-shadow: 0 0 0 6px rgba(156,227,220,0.16); /* focus uses #9CE3DC */
  }

  /* เพิ่มช่องว่างรอบปุ่ม submit */
  .form-actions {
    margin-top: 16px;
    margin-bottom: 8px;
  }
  /* ถ้ามีปุ่ม/อินพุตหลายอัน ให้มีช่องว่างระหว่างกัน */
  .form-actions .btn,
  .form-actions input[type="submit"] {
    display: block;
    margin-top: 8px;
  }

  /* เพิ่ม margin ให้ปุ่มใน modal (รวมปุ่ม login ที่ไม่ได้อยู่ใน .form-actions) */
  .modal-content .btn {
    margin-top: 12px;
  }

  /* Make the phone input visually match other text inputs (firstname/lastname) */
  .intl-tel-input input.form-control,
  .intl-tel-input input[type="tel"] {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #111827;
    background: #fff;
    transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
  }
  .intl-tel-input input.form-control:focus,
  .intl-tel-input input[type="tel"]:focus {
    outline: none;
    border-color: #9CE3DC;
    box-shadow: 0 0 0 4px rgba(156,227,220,0.14);
  }

  /* Phone input wrapper */
  .intl-tel-input {
    position: relative;
    width: 100%;
  }
  /* hide/remove any flag dropdown UI if present */
  .intl-tel-input .flag-dropdown { display: none; }

  /* ensure the phone input is on top and clickable like other inputs */
  .intl-tel-input input.form-control,
  .intl-tel-input input[type="tel"] {
    position: relative;
    z-index: 1;
  }

  /* utility: hide elements that should not interfere with input */
  .hidden { display: none !important; }

  .small {
    font-size: 0.85rem;
    color: #6b7280;
  }

  /* ลิงก์ใช้สีหลัก #FF7F49 และโฟกัสแสดงแสง #9CE3DC */
  a.show-signup,
  a.show-login {
    color: #FF7F49;
    text-decoration: none;
    cursor: pointer;
  }
  a.show-signup:hover,
  a.show-login:hover {
    text-decoration: underline;
    color: #FFBC6A;
  }
  a.show-signup:focus,
  a.show-login:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(156,227,220,0.12);
    border-radius: 4px;
  }

  /* Or line */
  .or-line {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0;
  }
  .or-line .border-line {
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  .or-line .text-gray-dark {
    color: #6b7280;
    font-size: 0.875rem;
  }

  /* Responsive */
  @media (max-width: 576px) {
    .auth-modal-wrapper { margin: 12px; }
    .modal-content { padding: 14px; }
  }
`;