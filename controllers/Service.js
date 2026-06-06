import db from "../config/Database.js";

export const getServices = async (req, res) => {
  try {
    const query = `SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY created_at DESC`;

    const [rows] = await db.execute(query);
    if (rows.length === 0) {
      return res.json({ message: "Service tidak ada" });
    }

    res.status(200).json({ status: 0, message: "Sukses", data: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
