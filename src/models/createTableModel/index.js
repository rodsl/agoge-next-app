import { join, dirname, basename, resolve } from "path";
import { Low, JSONFile } from "lowdb";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";

function dbConnect(idUser) {
  const fileName = basename(dirname(fileURLToPath(import.meta.url))).replace(
    "Model",
    ""
  );
  const path = resolve(".", "db", fileName, idUser);
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
  const adapter = new JSONFile(join(path, `master_id_${idUser}.json`));
  return new Low(adapter);
}

export const get = async (user) => {
  const db = dbConnect(user.id);
  await db.read();
  db.data ||= {
    userInfo: {
      id: user.id,
      name: user.name,
      username: user.username,
      lastLoggedIn: null,
    },
    tables: [],
  };
  
  return { data: db.data, db };
};
