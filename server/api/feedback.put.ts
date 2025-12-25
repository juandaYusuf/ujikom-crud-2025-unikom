import { db } from "../utils/db";
import type { ResultSetHeader } from "mysql2";

interface UpdateFeedbackPayload {
  id: number;
  name?: string;
  email?: string;
  message?: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdateFeedbackPayload>(event);

  const { id, name, email, message } = body;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing id",
    });
  }

  if (!name && !email && !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "No data to update",
    });
  }

  const fields: string[] = [];
  const values: any[] = [];

  if (name) {
    fields.push("name = ?");
    values.push(name);
  }

  if (email) {
    fields.push("email = ?");
    values.push(email);
  }

  if (message) {
    fields.push("message = ?");
    values.push(message);
  }

  values.push(id);

  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE customer_feedback
    SET ${fields.join(", ")}
    WHERE id = ?
    `,
    values
  );

  if (result.affectedRows === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Feedback not found",
    });
  }

  return {
    success: true,
    message: "Feedback updated",
    updatedId: id,
  };
});
