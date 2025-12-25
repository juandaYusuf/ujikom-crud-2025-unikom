import { db } from "../utils/db";
import type { RowDataPacket } from "mysql2";

interface CustomerFeedback extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  rating: number;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default defineEventHandler(async () => {
  const [rows] = await db.query<CustomerFeedback[]>(
    "SELECT * FROM customer_feedback"
  );
  const result = rows.map((row: any) => {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      rating: row.rating,
      message: row.message,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  });
  return result;
});
