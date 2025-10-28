const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// แสดงผู้ใช้ทั้งหมด
router.get('/users', userController.getUsers);

// แสดงผู้ใช้ตาม id
router.get('/users/:id', userController.getUserById);

// สมัครสมาชิก / เพิ่มผู้ใช้ใหม่
router.post('/users', userController.createUser);

// เข้าสู่ระบบ
router.post('/login', userController.loginUser);

// แก้ไขผู้ใช้
router.put('/users/:id', userController.updateUser);

// ลบผู้ใช้
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
