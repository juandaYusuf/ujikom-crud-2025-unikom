import { db } from "../utils/db";

export default defineEventHandler(async (event) => {
  // ambil body dari request
  const body = await readBody(event);

  const { name, email, message } = body;

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const [result] = await db.execute(
    `
    INSERT INTO customer_feedback
      (name, email, message, created_at, updated_at)
    VALUES
      (?, ?, ?, NOW(), NOW())
    `,
    [name, email, message]
  );

  return {
    success: true,
    message: "Feedback submitted",
    result,
  };
});
