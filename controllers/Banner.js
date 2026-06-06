import db from "../config/Database.js";

export const getBanner = async (req, res) => {
  try {
    const query = `SELECT banner_name, banner_image, description FROM banners ORDER BY created_at DESC`;

    const [rows] = await db.execute(query);
    if (rows.length === 0) {
      return res.json({ message: "Banner tidak ada" });
    }

    res.status(200).json({ status: 0, message: "Sukses", data: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
