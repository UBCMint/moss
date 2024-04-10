import { db } from '@/app/server/db'
import { NextResponse } from 'next/server'
import { users } from '@/app/server/db/schema/users'

/**
 * @returns {Promise<boolean>}
 * @description Deletes all users from the database
 */
async function deleteAllUsers (): Promise<boolean> {
  const query = db
    .select()
    .from(users)
    .limit(1)
  const result = await query.execute()

  if (result.length === 0) {
    return false
  }

  await db.delete(users)
  return true
}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 * @description Delete all users from the database and returns a response
 */
export async function DELETE (request: Request, response: Response): Promise<Response> {
  try {
    const deletionResult = await deleteAllUsers()

    if (deletionResult) {
      return NextResponse.json({ message: 'Users deleted.' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Data is empty, nothing to delete.' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.error()
  }
}
