import { AES, enc } from "crypto-js";
import { DateTime } from "luxon";
import { dbUsersModel, usersModel } from "models";
import { nanoid } from "nanoid";
import { apiService } from "services";
const secret = process.env.NEXT_CRYPTOJS_KEY;

export const authUser = async (user, pass) => {
  const { data, db } = await usersModel.get();

  const checkAdminUser = data.find(({ username }) => username === "admin");

  if (!checkAdminUser) {
    data.push({
      id: nanoid(),
      name: "admin",
      username: "admin",
      password: AES.encrypt("admin", secret).toString(),
      createdAt: DateTime.now().setLocale("pt-BR").toISO(),
      updatedAt: DateTime.now().setLocale("pt-BR").toISO(),
    });
    db.write();
  }

  const checkUser = data.find(
    ({ username, password }) =>
      username === user &&
      AES.decrypt(password, secret).toString(enc.Utf8) === pass
  );
  if (checkUser) {
    const { data, db } = await dbUsersModel.get(checkUser);
    data.userInfo.lastLoggedIn = DateTime.now().setLocale("pt-BR").toISO();
    db.write();
    return checkUser;
  }
  return null;
};
