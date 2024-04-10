import { db } from '@/app/server/db/index'
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type Headset, headsets } from '@/app/server/db/schema/headsets'
import { eq } from 'drizzle-orm'

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Fetches a headset by id from the database and returns a response
 */
export async function GET (request: NextApiRequest, response: NextApiResponse): Promise<Response> {
  try {
    if (request.url === undefined) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }
    const id = request.url.split('/').pop()?.toString()
    if (id === undefined) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }
    const numberId = parseInt(id)
    if (isNaN(numberId)) {
      return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 })
    }
    const headset: Headset[] = await db
      .select()
      .from(headsets)
      .where(eq(headsets.id, numberId))
      .execute()

    if (headset.length > 0) {
      return NextResponse.json({ message: 'Retrieving the headset', headset }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Headset with this id does not exist' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.error()
  }
}
