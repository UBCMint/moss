import { integer } from 'drizzle-orm/sqlite-core';
import { User } from '../../../../db/schema/users';
// pages/api/delete.ts
// pages/api/delete.ts

import { users} from "../../../../db/schema/users"
import { db } from "@/app/server/db/index";
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    // Handle the DELETE request here
    res.status(200).json({ message: 'DELETE request handled successfully' });
  } else {
    res.status(405).json({ message: 'Only DELETE requests are allowed' });
  }
}
export async function DELETE (request: Request) {
  try {

    const id = request.url.split('/').pop() as string;
    const number_id = parseInt(id)
    if (isNaN(number_id)) {
      return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
    }

    const deletedUsers: User[] = 
      await db.delete(users).where(eq(users.id, number_id)).returning();
      
      
    return NextResponse.json({ deletedUsers }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500});
  }
}

