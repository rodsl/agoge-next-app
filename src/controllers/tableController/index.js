import { dbUsersModel, usersModel, createTableModel } from "models";
import _ from "lodash";

export const createTableController = async (idUser, body) => {
  const { data, db } = await usersModel.get();

  const getUser = data.find(({ id }) => id === idUser);

  if (getUser) {
    const { data, db } = await dbUsersModel.get(getUser);

    const checkTableExists = data.tables.find(
      ({ tableName }) => tableName === body.nomeTabela
    );

    if(_.isUndefined(checkTableExists)){

      const newTable = await createTableModel(getUser)
    }

    console.log(checkTableExists);
  }
};
