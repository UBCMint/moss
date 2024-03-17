import { db } from '@/app/server/db';
import { users } from '@/app/server/db/schema/users';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const userData = await request.json();
        console.log(userData);

        const createdUser = await db.insert(users).values(
            { 
                id: userData.id,
                username: userData.username,
                password: userData.password,
                email: userData.email,
                role: userData.role
            }
        ).returning();

        console.log(createdUser);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal server error' });
    }
}