import { type User, users } from '@/app/server/db/schema'
import { db } from '@/app/server/db/index'
import { eq } from 'drizzle-orm'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

/**
 * Handles DELETE requests to delete a user by ID.
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 */

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'DELETE') {
    // Handle the DELETE request here
    res.status(200).json({ message: 'DELETE request handled successfully' })
  } else {
    res.status(405).json({ message: 'Only DELETE requests are allowed' })
  }
}

/**
 * @param {Request} request - The HTTP request object.
 * @returns {NextResponse} response
 * @description deletes a user from the database and returns a response.
 */
export async function DELETE (request: Request): Promise<NextResponse<unknown>> {
  try {
    const id = request.url.split('/').pop()!
    const numberId = parseInt(id)
    if (isNaN(numberId)) {
      return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 })
    }

    const deletedUsers: User[] =
      await db.delete(users).where(eq(users.id, numberId)).returning()

    return NextResponse.json({ message: 'User deleted successfully', deletedUsers }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
