import { db } from "@/app/server/db/index";
import { NextResponse } from "next/server";
import { User, users } from "@/app/server/db/schema/users";

/**
 * @returns {Promise<Headset[]>}
 * @description Fetches all users from the database
 */
async function fetchUsers(): Promise<User[]>{
    const query = db
      .select()
      .from(users)
    const result = await query.execute();
    return result;
  }

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 * @description Fetches all users from the database and returns a response
 */
export async function GET(request: Request, response: Response) {
    try {
      const usersQuery = await fetchUsers();  
      return NextResponse.json(usersQuery);
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  }