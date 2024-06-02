import { type NextRequest, NextResponse } from 'next/server'
import fs from 'fs'

/**
 * GET route handler for checking if local.config.json is present.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 */
export async function GET (request: Request, response: Response): Promise<Response> {
  try {
    fs.readFileSync('local.config.json')
    return NextResponse.json({ config: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ config: false }, { status: 200 })
  }
}

/**
 * POST route handler for creating local.config.json if it doesn't exist.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 */
export async function POST (req: NextRequest, response: Response): Promise<Response> {
  const data = await req.json()
  const defaultConfig = data

  if (fs.existsSync('./local.config.json')) {
    try {
      fs.unlinkSync('./local.config.json')
    } catch (error) {
      return NextResponse.json({ error: 'Error in deleting config' }, { status: 500 })
    }
  }

  try {
    fs.writeFileSync('./local.config.json', JSON.stringify(defaultConfig))
    try {
      fs.readFileSync('./local.config.json')
      return NextResponse.json({ config: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: 'Error in writing config' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error in writing config' }, { status: 500 })
  }
}

/**
 * DELETE route handler for deleting local.config.json if it exists.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Response} - The response object.
 */
export async function DELETE (request: Request, response: Response): Promise<Response> {
  if (fs.existsSync('./local.config.json')) {
    try {
      fs.unlinkSync('./local.config.json')
    } catch (error) {
      return NextResponse.json({ error: 'Error in deleting config' }, { status: 500 })
    }
    return NextResponse.json({ message: 'Config deleted' }, { status: 200 })
  } else {
    return NextResponse.json({ error: 'Config does not exist' }, { status: 400 })
  }
}
