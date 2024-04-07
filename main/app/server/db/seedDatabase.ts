import { db} from '@/app/server/db/index'
import { type User, users } from './schema/users'


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

/**
 * @returns null
 * @description Generates random data for 10 users
 */

async function seedDatabase () {
    for (let i: number = 0; i < numberOfUsers; i++) {
        await db.insert(users).values({
            username: randomUserUsernames[i], 
            password: randomUserPasswords[i], 
            email: randomUserUsernames[i] + "" + "@mail.com", 
            role: randomUserRoles[i]});
    }
}

seedDatabase();

