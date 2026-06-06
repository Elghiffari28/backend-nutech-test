import bcrypt from "bcrypt";
import db from "../config/Database.js";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const query = `INSERT INTO users (email, first_name, last_name, password) VALUE (?,?,?,?)`;
    const data = await connection.execute(query, [
      email,
      first_name,
      last_name,
      hashPassword,
    ]);

    await connection.commit();

    res.json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      message: error.message,
    });
  } finally {
    connection.release();
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT id, first_name, email, password FROM users WHERE email = ?`;

    const [rows] = await db.execute(query, [email]);
    console.log(rows);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }
    const user = rows[0];
    const isMatech = await bcrypt.compare(password, user.password);
    if (!isMatech) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    res.json({ message: "login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
