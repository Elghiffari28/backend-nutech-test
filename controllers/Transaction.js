import { json } from "express";
import db from "../config/Database.js";

const getToday = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

const generateInvoice = async () => {
  const today = getToday();

  const [rows] = await db.execute(
    `SELECT invoice_number FROM transactions WHERE invoice_number LIKE ? ORDER BY id DESC LIMIT 1`,
    [`${today}-%`],
  );

  let sequence = 1;
  if (rows.length > 0) {
    const lastInvoice = rows[0].invoice_number;

    const lastSequence = parseInt(lastInvoice.split("-")[1], 10);
    sequence = lastSequence + 1;
  }

  const invoiceNumber = `${today}-${String(sequence).padStart(3, "0")}`;
  // console.log(invoiceNumber);

  return invoiceNumber;
};

const transaction = async (
  user_id,
  transaction_type,
  description,
  total_amount,
  service_code,
  service_name,
  user_balance,
) => {
  try {
    if (transaction_type === "PAYMENT" && user_balance < total_amount) {
      const err = new Error("Balance tidak cukup");
      err.statusCode = 400;
      throw err;
    }
    const invoice_number = await generateInvoice();
    const query = `INSERT INTO transactions (user_id, invoice_number, transaction_type, description, total_amount, service_code, service_name) VALUES (?,?,?,?,?,?,?)`;
    const [result] = await db.execute(query, [
      user_id,
      invoice_number,
      transaction_type,
      description,
      total_amount,
      service_code,
      service_name,
    ]);
    let new_balance = 0;

    if (transaction_type === "TOPUP") {
      new_balance = user_balance + total_amount;
    } else {
      new_balance = user_balance - total_amount;
    }
    await db.execute(`UPDATE users SET balance = ? WHERE id = ?`, [
      new_balance,
      user_id,
    ]);

    console.log(result.insertId);

    const [rows] = await db.execute(
      `SELECT 
    id,
    invoice_number,
    transaction_type,
    total_amount,
    service_code,
    service_name
  FROM transactions
  WHERE id = ?`,
      [result.insertId],
    );

    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const topupBalance = async (req, res) => {
  try {
    const email = req.user.email;
    const id = req.user.id;
    const topup_amount = parseInt(req.body.top_up_amount);

    if (!topup_amount || topup_amount < 0) {
      return res.json({ message: "Balance tidak sesuai" });
    }

    const query = `SELECT balance FROM users WHERE email = ?`;
    const [result] = await db.execute(query, [email]);
    if (result.length === 0) {
      return res.json({ message: "User tidak ada" });
    }

    const total = result[0].balance + topup_amount;
    // const update = `UPDATE users SET balance = ? WHERE email = ?`;
    // const data = await db.execute(update, [total, email]);

    await transaction(
      id,
      "TOPUP",
      null,
      topup_amount,
      null,
      null,
      result[0].balance,
    );
    res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const payment = async (req, res) => {
  try {
    const email = req.user.email;
    const user_id = req.user.id;
    const code = req.body.service_code;

    const query = `SELECT balance FROM users WHERE email = ?`;
    const [result] = await db.execute(query, [email]);
    if (result.length === 0) {
      return res.json({ message: "User tidak ada" });
    }
    const serviceQuery = `SELECT service_name, service_code, service_tariff FROM services WHERE service_code = ?
    `;
    const [service] = await db.execute(serviceQuery, [code]);
    if (service.length === 0) {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null,
      });
    }
    const data = await transaction(
      user_id,
      "PAYMENT",
      service[0].service_name,
      service[0].service_tariff,
      service[0].service_code,
      service[0].service_name,
      result[0].balance,
    );

    const { id, ...responseData } = data;
    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const id = req.user.id;
    const limit = parseInt(req.body.limit);
    const offset = parseInt(req.body.offset) || 0;

    let query = `SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions ORDER BY created_on DESC`;

    if (!Number.isNaN(limit)) {
      query += ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    }

    const [result] = await db.execute(query);
    console.log(result);
    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: offset,
        limit: limit,
        records: result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
