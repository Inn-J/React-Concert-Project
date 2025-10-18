import React, { useState } from 'react';
import styled from 'styled-components';

// NOTE: I've removed the duplicate 'import React from 'react';' at the top.

function AuthModal({ className }) { // accept styled-components className
    // State is sufficient for all fields in both forms
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
    });

    // State to manage which view is visible (Login or Registration)
    const [isLoginView, setIsLoginView] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // The name attribute in the JSX must match the key in formData
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // LOGIN logic uses only email and password
        const payload = {
            user: {
                email: formData.email,
                password: formData.password,
            }
        };

        console.log('Login Payload Submitted:', payload);
        // API call to /users/sign_in here...
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // REGISTRATION logic uses all fields
        if (!formData.email || !formData.password || !formData.firstname || !formData.lastname || !formData.phone) {
            alert('Please fill in all required fields for registration.');
            return;
        }

        const payload = {
            user: {
                email: formData.email,
                password: formData.password,
                firstname: formData.firstname,
                lastname: formData.lastname,
                phone: formData.phone,
            }
        };

        console.log('Registration Payload Submitted:', payload);
        // API call to /users here...
    };

    return (
        // The parent container manages the conditional display of the two forms
        <div className={`${className || ''} auth-modal-wrapper`}>
            {/* -------------------- LOGIN FORM -------------------- */}
            <div className={`modal-content signin-body px-2 ${isLoginView ? '' : 'hide'}`}>
                <div className="modal-header">
                    <button className="close" data-dismiss="modal" onClick={() => console.log('Close Modal')}>
                        <span aria-hidden="true">×</span>
                    </button>
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
                    <button type="button" className="close" data-dismiss="modal" onClick={() => console.log('Close Modal')}>
                        <span aria-hidden="true">×</span>
                    </button>
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

  input.form-control:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  }

  .btn {
    display: inline-block;
    width: 100%;
    padding: 10px 14px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(180deg,#2563eb,#1e40af);
    color: #fff;
    border: none;
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
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
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

  a.show-signup,
  a.show-login {
    color: #2563eb;
    text-decoration: none;
    cursor: pointer;
  }
  a.show-signup:hover,
  a.show-login:hover {
    text-decoration: underline;
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