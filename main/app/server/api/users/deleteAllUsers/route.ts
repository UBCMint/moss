import { db } from "@/app/server/db";
import { NextResponse } from "next/server";
import { users } from "@/app/server/db/schema/users";

/**
 * @returns {Promise<Response>}
 * @description Deletes all users from the database
 */
async function deleteAllUsers(): Promise<Response> {
  const query = db
    .select()
    .from(users)
    .limit(1);
  const result = await query.execute();
  
  if (result.length === 0) {
    return NextResponse.json({ message: "Data is empty, nothing to delete." }, {status: 404});
  }

  await db.delete(users);
  return NextResponse.json({ message: "Users deleted." }, {status: 200});
}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 * @description Delete all users from the database and returns a response
 */
export async function DELETE(request: Request, response: Response) {
  try {
    return usersQuery = await deleteAllUsers();  
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
