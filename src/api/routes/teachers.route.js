const express = require('express');
const teachersRouter = express.Router();

const {getTeachers, postTeacher, putTeacher, deleteTeacher} = require("../controllers/teachers.constroller")

teachersRouter.get("/", getTeachers);
teachersRouter.post("/", postTeacher)
teachersRouter.put("/:id", putTeacher)
teachersRouter.delete("/:id", deleteTeacher)

module.exports = teachersRouter;