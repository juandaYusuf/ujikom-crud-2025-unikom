import { db } from "../utils/db";
import type { ResultSetHeader } from "mysql2";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.id);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or missing id",
    });
  }

  const [result] = await db.execute<ResultSetHeader>(
    "DELETE FROM customer_feedback WHERE id = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Feedback not found",
    });
  }

  return {
    success: true,
    message: "Feedback deleted",
    deletedId: id,
  };
});
