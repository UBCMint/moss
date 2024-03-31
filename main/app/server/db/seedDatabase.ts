import { db } from './index';
import { type User, users } from '@/app/server/db/schema/users';

/**
 * @description generates random data for 10 users
 * @return null
 */

function seedDatabase() {
    let numberOfUsers = 10;
    let randomUserUsernames: string[] = [
        "amazing-anteater", "cool-crab", "dapper-dolphin", "great-giraffe", "perfect-panda", 
        "lazy-leopard", "cute-capybara", "playful-platypus", "nice-narwhal", "friendly-frog"
    ]
    let randomUserPasswords: string[] = [
        "mytseryPass", "ObscureString", "encrypted_letters", "secret-signal", "mot-de-passe",
        "id unknown", "contrasena", "parola-d'ordine", "enigmaticKey", "pasuwado"
    ]
    let randomUserRoles: string[] = [
        "Software Engineer", "Product Manager", "Electrical Engineer", "Web Developer", "VP Engineering",
        "UX Designer", "Signals Engineer", "Data Scientist", "Neuroscience Researcher", "Clinician"
    ]

    for (let i: number = 0; i < numberOfUsers; i++) {
        db.insert(users).values({
            username: randomUserUsernames[i], 
            password: randomUserPasswords[i], 
            email: randomUserUsernames[i] + "" + "@mail.com", 
            role: randomUserRoles[i]});
    }
} 

seedDatabase();