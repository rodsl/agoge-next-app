// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { join, dirname, resolve, basename } from "path";
import { Low, JSONFile } from "lowdb";
import { existsSync, mkdirSync } from "fs";
import { nanoid } from "nanoid";
import { AES } from "crypto-js";
import { DateTime } from "luxon";
import { authController } from "controllers";
// const path = (dirname, "./db/auth");

// if (!existsSync(path)) mkdirSync(path, { recursive: true });
export default async function handler(req, res) {
  // const adapter = new JSONFile(join(path, "db.json"));
  // const db = new Low(adapter);
  // await db.read();
  // db.data ||= { users: [] };
  // const { users } = db.data;

  // const checkAdminUser = users.find(({ username }) => username === "admin");

  // if (!checkAdminUser) {
  //   users.push({
  //     id: nanoid(),
  //     name: "admin",
  //     username: "admin",
  //     password: AES.encrypt("admin", process.env.NEXT_CRYPTOJS_KEY).toString(),
  //     createdAt: DateTime.now().setLocale("pt-BR").toISO(),
  //     updatedAt: DateTime.now().setLocale("pt-BR").toISO(),
  //   });
  //   // Save to file
  //   db.write();
  // }
  const teste = await authController.authUser()




  res.status(200).json({});
}
