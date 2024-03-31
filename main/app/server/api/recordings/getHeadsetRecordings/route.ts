import { db } from '@/app/server/db/index'
import { NextResponse } from 'next/server'
import { type Recording, recordings } from '@/app/server/db/schema/recordings'

/**
 * @returns {Promise<Recording[]>}
 * @description Fetches all headset recordings from the database
 */
async function fetchRecordings(): Promise<Recording[]> {
  const query = db
    .select()
    .from(recordings)
  const result = await query.execute()
  return result
}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 * @description Fetches all headset recordings from the database and returns a response
 */
export async function GET(request: Request, response: Response): Promise<Response> {
  try {
    const recordingsQuery = await fetchRecordings()
    return NextResponse.json(recordingsQuery)
  } catch (error) {
    return NextResponse.error()
  }
}
