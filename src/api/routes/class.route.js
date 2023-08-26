
const express = require('express');
const classRouter = express.Router();

const {getClass, getOneClass, getOneClassByName, getOneClassByType,deleteClass, postClass, putClass} = require("../controllers/class.controller")

classRouter.get("/", getClass);
classRouter.get("/:id", getOneClass)
classRouter.get("/findByName/:name", getOneClassByName)
classRouter.get("/findByType/:Type", getOneClassByType)
classRouter.get("/deleted/:deleteClass", deleteClass)
classRouter.post("/", postClass)
classRouter.put("/:id", putClass)
classRouter.delete("/:id", deleteClass)

module.exports = classRouter;