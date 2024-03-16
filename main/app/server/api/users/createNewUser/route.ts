import { db } from "@/app/server/db";
import { users } from "@/app/server/db/schema/users";
import {NextApiRequest, NextApiResponse} from "next";


let roles = new Set<string>(["Software Engineer", "Product Manager", "Electrical Engineer"])

/**
 * @returns null
 * @description Adds a new user to the database
 */
async function addUser(username: string, password: string, email: string, role: string) {
    await db.insert(users).values({username: username, password: password, email: email, role: role});
}

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns {Promise<Response>}
 * @description Adds a new user to the database and returns a response
 */
export async function POST(request: NextApiRequest, response: NextApiResponse) {
    const input = await request.json();
    const username = input.username;
    const password = input.password;
    const email = input.email;
    const role = input.role;

    try {
        if (typeof username != 'string' || typeof password != 'string' ||
            typeof email != 'string' || typeof role != 'string' || !roles.has(role)) {
            return new Response( JSON.stringify("missing parameters or invalid role") ,{ status:400 } )
        }
        await addUser(username as string, password as string, email as string, role as string);
        return new Response( JSON.stringify("user created") ,{ status:200 } )
    } catch (error) {
        return new Response( JSON.stringify("unable to create user") ,{ status:500 } )
    }
}