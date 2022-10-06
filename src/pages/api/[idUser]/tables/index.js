// pages/api/hello.js
import { createTableController } from "controllers/tableController";
import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(405).json("Method Not Allowed");
  },
})
  .get((req, res) => {
    console.log(req.query);
    const { idUser } = req.query;
    res.json({ idUser });
  })
  .post((req, res) => {
    console.log(req.query);
    console.log(req.body);

    const { idUser } = req.query;
    const response = createTableController(idUser, req.body);
    res.json({ hello: "world" });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
