import db from "../config/Database.js";

const createMigration = async () => {
  try {
    const queryBanner = `CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  banner_name VARCHAR(100) NOT NULL,
  banner_image VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

    const queryService = `CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_code VARCHAR(100),
  service_name VARCHAR(100),
  service_icon VARCHAR(255),
  service_tariff INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

    await db.execute(queryBanner);
    await db.execute(queryService);
    console.log("Tabel berhasil dibuat");
  } catch (error) {
    console.error(error);
  }
};

const insertService = async () => {
  const query = `INSERT INTO services (
  service_code,
  service_name,
  service_icon,
  service_tariff
) VALUES
('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000)`;
  await db.execute(query);
  console.log("Berhasil input");
};

const insertBanner = async () => {
  const query = `INSERT INTO banners (
  banner_name,
  banner_image,
  description
) VALUES
('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet')`;
  await db.execute(query);
  console.log("Berhasil input");
};

createMigration();
