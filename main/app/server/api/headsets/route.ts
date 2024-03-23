import { db } from '@/app/server/db/index'
import { NextResponse } from 'next/server'
import { type Headset, headsets } from '@/app/server/db/schema/headsets'
import { NextApiRequest, NextApiResponse } from 'next'
import { eq } from 'drizzle-orm'

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

/**
 * @returns null
 * @description Adds a new headset to the database
 */
async function addHeadset (id: number, name: string, description: string, channelNumber: number, channelList: string, purpose: string, portability: string, price: number, company: string, batteryLife: string) {
  await db.insert(headsets).values({id: id, name: name, description: description, channelNumber: channelNumber, channelList: channelList, purpose: purpose, portability: portability, price: price, company: company, batteryLife: batteryLife});
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Adds a new headset to the database and returns a response
 */
export async function POST (request: NextApiRequest, response: NextApiResponse) {
  const input = await request.json();
  const { id, name, description, channelNumber, channelList, purpose, portability, price, company, batteryLife } = input;

  try {    
    await addHeadset(id, name, description, channelNumber, channelList, purpose, portability, price, company, batteryLife);
    return new Response('Headset added successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to add headset', { status: 500 });
  }
}

/**
 * @returns null
 * @description Deletes a headset from the database
 */
async function deleteHeadset (id: number) {
  await db.delete(headsets).where(headsets.id.eq(id));
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Deletes a headset from the database and returns a response
 */
export async function DELETE (request: NextApiRequest, response: NextApiResponse) {
  const input = await request.json();
  const { id } = input;

  try {
    await deleteHeadset(id);
    return new Response('Headset deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete headset', { status: 500 });
  }
}

