const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// อ่าน users.json ทั้งหมด
exports.getUsers = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  res.json(users);
};

// อ่าน user ตาม id
exports.getUserById = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  const user = users.find(u => String(u.id) === String(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};



// 🟩 สมัครสมาชิก (เพิ่ม user ใหม่)
exports.createUser = (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
    // ตรวจสอบ email ซ้ำ
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      password,
      phone: phone || '',
    };
    
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error writing to users.json:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// เข้าสู่ระบบ
exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error reading users.json:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🟨 แก้ไขข้อมูลผู้ใช้
exports.updateUser = (req, res) => {
  try {
    const userId = String(req.params.id);
    const updatedData = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    const index = users.findIndex(u => String(u.id) === userId);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users[index] = { ...users[index], ...updatedData };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json({ message: 'User updated successfully', user: users[index] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🟥 ลบผู้ใช้
exports.deleteUser = (req, res) => {
  try {
    const userId = String(req.params.id);
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    const exists = users.some(u => String(u.id) === userId);
    if (!exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter(u => String(u.id) !== userId);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
