import db from "../config/Database.js";

const createTable = async () => {
  try {
    const query = `CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    transaction_type ENUM('TOPUP', 'PAYMENT') NOT NULL,
    description TEXT NULL,
    total_amount INT NOT NULL,
    service_code VARCHAR(50),
    service_name VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await db.execute(query);
    console.log("Tabel user berhasil dibuat");
  } catch (error) {
    console.error(error);
  }
};

createTable();
