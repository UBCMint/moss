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
 * @param {number} id
 * @param {string} name
 * @param {string} description
 * @param {number} channelNumber
 * @param {string} channelList
 * @param {string} purpose
 * @param {string} portability
 * @param {number} price
 * @param {string} company
 * @param {string} batteryLife
 * @returns null
 * @description Adds a new headset to the database
 */
async function addHeadset (
  id: number, 
  name: string, 
  description: string, 
  channelNumber: number, 
  channelList: string, 
  purpose: string, 
  portability: string, 
  price: number, 
  company: string, 
  batteryLife: string) {

  await db
    .insert(headsets)
    .values({
      id: id, 
      name: name, 
      description: description, 
      channelNumber: channelNumber, 
      channelList: channelList, 
      purpose: purpose, 
      portability: portability, 
      price: price, 
      company: company, 
      batteryLife: batteryLife
    });
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Adds a new headset to the database and returns a response
 */
export async function POST (request: NextApiRequest, response: NextApiResponse): Promise<Response> {
  const input = await request.json();
  const { id, name, description, channelNumber, channelList, purpose, portability, price, company, batteryLife } = input;

  try {    
    if (
      typeof id !== 'number' || 
      typeof name !== 'string' || 
      typeof description !== 'string' || 
      typeof channelNumber !== 'number' || 
      typeof channelList !== 'string' || 
      typeof purpose !== 'string' || 
      typeof portability !== 'string' || 
      typeof price !== 'number' || 
      typeof company !== 'string' || 
      typeof batteryLife !== 'string'
      ) {
      return new Response('Invalid input', { status: 400 });
    }
    await addHeadset(id, name, description, channelNumber, channelList, purpose, portability, price, company, batteryLife);
    return new Response('Headset added successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to add headset', { status: 500 });
  }
}

/**
 * @param {number} id
 * @returns {Promise<boolean>}
 * @description Deletes a headset from the database
 */
async function deleteHeadset (id: number): Promise<boolean> {
  const result = await db
    .delete(headsets)
    .where(eq(headsets.id, id))
    .execute();

  return result.changes > 0;
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Deletes a headset from the database and returns a response
 */
export async function DELETE (request: NextApiRequest, response: NextApiResponse): Promise<Response> {
  const { id } = await request.json();

  try {
    if (typeof id !== 'number') {
      return new Response('Invalid input', { status: 400 });
    }
    const success = await deleteHeadset(id);
    if (success) {
      return new Response('Headset deleted successfully', { status: 200 });
    } else {
      return new Response('Headset not found', { status: 404 });
    }
    
  } catch (error) {
    return new Response('Failed to delete headset', { status: 500 });
  }
}

/**
 * @param {number} id
 * @param {Object} updates
 * @returns {Promise<boolean>}
 * @description Updates a headset in the database
 */
async function updateHeadset(id, updates): Promise<boolean> {
  const { name, description, channelNumber, channelList, purpose, portability, price, company, batteryLife } = updates;
  const existingHeadset = await db
    .select()
    .from(headsets)
    .where(eq(headsets.id, id))
    .execute();

  if (existingHeadset.length === 0) {
    return false;
  }

  await db
    .update(headsets)
    .set({
      ...(name && { name }),
      ...(description && { description }),
      ...(channelNumber && { channelNumber }),
      ...(channelList && { channelList }),
      ...(purpose && { purpose }),
      ...(portability && { portability }),
      ...(price && { price }),
      ...(company && { company }),
      ...(batteryLife && { batteryLife }),
    })
    .where(eq(headsets.id, id))
    .execute();

  return true;
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Updates a headset in the database and returns a response
 */
export async function PATCH (request: NextApiRequest, response: NextApiResponse): Promise<Response>{
  const { id, ...updates } = await request.json();

  try {
    if (typeof id !== 'number') {
      return new Response('Invalid input for ID', { status: 400 });
    }
    const wasUpdated = await updateHeadset(id, updates);
    if (!wasUpdated) {
      return new Response('Headset not found', { status: 404 });
    }
    return new Response('Headset updated successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to update headset', { status: 500 });
  }
}