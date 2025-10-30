const express = require('express');
const fs = require('fs');
const path = require('path');
const adminFilePath = path.join(__dirname, '../data/admin.json');

// ตรวจสอบข้อมูลผู้ดูแลระบบ
exports.loginAdmin = (req, res) => {
  try{const { username, password } = req.body;
  const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));

  if (adminData.username === username && adminData.password === password) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
    }catch (error) {
    console.error('Error reading admin.json:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};