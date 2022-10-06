import { join, dirname, basename, resolve } from "path";
import { Low, JSONFile } from "lowdb";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";

function dbConnect() {
  const fileName = basename(dirname(fileURLToPath(import.meta.url))).replace(
    "Model",
    ""
  );
  const path = resolve(".", "db", fileName);
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
  const adapter = new JSONFile(join(path, `${fileName}.json`));
  return { db: new Low(adapter), model: fileName };
}

export const get = async () => {
  const { db, model } = dbConnect();
  await db.read();
  db.data ||= { [model]: [] };
  db.data;
  return { data: db.data[model], db };
};
