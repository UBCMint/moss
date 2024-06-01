import { NextResponse } from 'next/server'
import fs from 'fs'

/**
 * GET route handler for getting the config.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 */
export async function GET (request: Request, response: Response): Promise<Response> {
  try {
    const config = fs.readFileSync('local.config.json', 'utf-8')
    return NextResponse.json(JSON.parse(config), { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error in fetching config' }, { status: 500 })
  }
}
