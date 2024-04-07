console.log('Not working yet...')

// import { db } from '@/app/server/db/index'
// import { users } from './schema/users'

// const numberOfUsers = 10
// const randomUserUsernames: string[] = [
//   'amazing-anteater', 'cool-crab', 'dapper-dolphin', 'great-giraffe', 'perfect-panda',
//   'lazy-leopard', 'cute-capybara', 'playful-platypus', 'nice-narwhal', 'friendly-frog'
// ]
// const randomUserPasswords: string[] = [
//   'mytseryPass', 'ObscureString', 'encrypted_letters', 'secret-signal', 'mot-de-passe',
//   'id unknown', 'contrasena', "parola-d'ordine", 'enigmaticKey', 'pasuwado'
// ]
// const randomUserRoles: string[] = [
//   'Software Engineer', 'Product Manager', 'Electrical Engineer', 'Web Developer', 'VP Engineering',
//   'UX Designer', 'Signals Engineer', 'Data Scientist', 'Neuroscience Researcher', 'Clinician'
// ]

// /**
//  * @returns null
//  * @description Generates random data for 10 users
//  */

// async function seedDatabase (): Promise<void> {
//   for (let i: number = 0; i < numberOfUsers; i++) {
//     await db.insert(users).values({
//       username: randomUserUsernames[i],
//       password: randomUserPasswords[i],
//       email: randomUserUsernames[i] + '' + '@mail.com',
//       role: randomUserRoles[i]
//     })
//   }
// }

// void seedDatabase()
