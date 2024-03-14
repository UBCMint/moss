import { db } from "@/app/server/db/index";
import { NextResponse } from "next/server";
import { User, users } from "@/app/server/db/schema";

// Create a route in server/api that obtains all the information currently in 
// the user table under the main database. Return all the data present in the database as JSON.

// Create a method to ensure that the there is actually data present in the Users table in the 
// first place. Test for the case where no data is present and for the case where there is data present.

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