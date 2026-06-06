import db from "../config/Database.js";

export const getProfile = async (req, res) => {
  try {
    const email = req.user.email;

    const query = `SELECT email, first_name, last_name, profile_image FROM users WHERE email = ?`;
    const [result] = await db.execute(query, [email]);
    if (result.length === 0) {
      return res.json({ message: "User tidak ada" });
    }

    res.json({ status: 0, message: "Suksess", data: result[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const email = req.user.email;

    const query = `UPDATE users SET first_name = ?, last_name = ? WHERE email = ?`;
    const [result] = await db.execute(query, [first_name, last_name, email]);
    if (result.length === 0) {
      return res.json({ message: "User tidak ada" });
    }

    res.json({ status: 0, message: "Suksess", data: result[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    // tambah validasi png jpg saja
    const image = req.file;
    const email = req.user.email;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(image.mimetype)) {
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    }

    const query = `UPDATE users SET profile_image = ? WHERE email = ?`;
    const [result] = await db.execute(query, [image.originalname, email]);
    if (result.length === 0) {
      return res.json({ message: "User tidak ada" });
    }
    res.json({ status: 0, message: "Suksess", data: result[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Balance
export const getBalance = async (req, res) => {
  try {
    const email = req.user.email;

    const query = `SELECT balance FROM users WHERE email = ?`;
    const [result] = await db.execute(query, [email]);
    if (result.length === 0) {
      return res.json({ message: "User tidak ada" });
    }

    res.json({ status: 0, message: "Get Balance Berhasil", data: result[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
