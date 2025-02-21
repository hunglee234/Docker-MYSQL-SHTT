require("dotenv").config();
const mysql = require("mysql2");

// Tạo kết nối đến MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Kiểm tra kết nối
db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL: ", err);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
  }
});

module.exports = db;
