const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
app.use(bodyParser.json());

/**
 * 1. Lấy danh sách users (READ)
 */
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/**
 * 2. Thêm user mới (CREATE)
 */
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: result.insertId, name, email });
    }
  );
});

/**
 * 3. Cập nhật user theo ID (UPDATE)
 */
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Cập nhật thành công!" });
    }
  );
});

/**
 * 4. Xóa user theo ID (DELETE)
 */
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Xóa thành công!" });
  });
});

// Chạy server
app.listen(3000, () => {
  console.log("🚀 Server chạy tại http://localhost:3000");
});
