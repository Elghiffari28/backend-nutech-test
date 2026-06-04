import db from "../config/Database.js";

const createTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_image varchar(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

    await db.execute(query);
    console.log("Tabel user berhasil dibuat");
  } catch (error) {
    console.error(error);
  }
};

createTable();
