import { db } from "../utils/db";

export default defineEventHandler(async (event) => {
  // ambil body dari request
  const body = await readBody(event);

  const { name, email, rating, message, status = "pending" } = body;

  if (!name || !email || !rating || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const [result] = await db.execute(
    `
    INSERT INTO customer_feedback
      (name, email, rating, message, status, created_at, updated_at)
    VALUES
      (?, ?, ?, ?, ?, NOW(), NOW())
    `,
    [name, email, rating, message, status]
  );

  return {
    success: true,
    message: "Feedback submitted",
    result,
  };
});
