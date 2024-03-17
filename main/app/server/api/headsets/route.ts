import { db } from "@/app/server/db/index";
import { NextResponse } from "next/server";
import { Headset, headsets } from "@/app/server/db/schema/headsets";
import { users } from "../../db/schema/users";

/**
 * @returns {Promise<Headset[]>}
 * @description Fetches all headsets from the database
 */
async function fetchHeadsets(): Promise<Headset[]>{
  const query = db
    .select()
    .from(headsets)
  const result = await query.execute();
  return result;
}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 * @description Fetches all headsets from the database and returns a response
 */
export async function GET(request: Request, response: Response) {
  try {
    const headsetsQuery = await fetchHeadsets();  
    return NextResponse.json(headsetsQuery);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
