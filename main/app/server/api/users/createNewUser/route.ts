import { db } from '@/app/server/db'
import { users } from '@/app/server/db/schema/users'
import { type NextApiRequest, type NextApiResponse } from 'next'

/**
 * @param {String}
 * @description List of possible roles
 */

const roles = new Set<string>(['Software Engineer', 'Product Manager', 'Electrical Engineer'])

/**
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @param {String} role
 * @returns null
 * @description Adds a new user to the database
 */
async function addUser (username: string, password: string, email: string, role: string): Promise<void> {
  await db.insert(users).values({ username, password, email, role })
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Adds a new user to the database and returns a response
 */
export async function POST (request: NextApiRequest, response: NextApiResponse): Promise<Response> {
  const data = await request.body
  const username = data.username
  const password = data.password
  const email = data.email
  const role = data.role

  try {
    if (typeof username !== 'string' || typeof password !== 'string' ||
            typeof email !== 'string' || typeof role !== 'string' || !roles.has(role)) {
      return new Response('invalid type of parameters')
    }
    await addUser(username, password, email, role)
    return new Response(JSON.stringify('user created'), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify('unable to create user'), { status: 500 })
  }
}
