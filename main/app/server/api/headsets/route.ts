import { db } from '@/app/server/db/index'
import { NextResponse } from 'next/server'
import { type Headset, headsets } from '@/app/server/db/schema/headsets'

/**
 * @returns {Promise<Headset[]>}
 * @description Fetches all headsets from the database
 */
async function fetchHeadsets (): Promise<Headset[]> {
  const query = db
    .select()
    .from(headsets)
  const result = await query.execute()
  return result
}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 * @description Fetches all headsets from the database and returns a response
 */
export async function GET (request: Request, response: Response): Promise<Response> {
  try {
    const headsetsQuery = await fetchHeadsets()
    return NextResponse.json(headsetsQuery)
  } catch (error) {
    return NextResponse.error()
  }
}

// POST request should add a new row to the database. Ensure the data being added to the 
// database is of valid type for the specific columns its being added to.

/**
 * @returns null
 * @description Adds a new headset to the database
 */
async function addHeadset (id: number, name: string, description: string, channelNumber: number, channelList: string, purpose: string, portability: string, price: number, company: string, batteryLife: string) {
  await db.insert(headsets).values({id: id, name: name, description: description, channelNumber: channelNumber, channelList: channelList, purpose: purpose, portability: portability, price: price, company: company, batteryLife: batteryLife});
}


