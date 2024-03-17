// controller.ts

import { db } from "@/app/server/db/index";

export async function deleteUser(id: number) {
  try {
    await new Promise<void>((resolve, reject) => {

      //@ts-ignore
      db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
        if (err) {
          console.error("Error deleting user:", err.message);
          reject(new Error("Error deleting user"));
        } else {
          console.log("User deleted successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    throw error; // re-throwing the error for higher-level handling
  }
}
