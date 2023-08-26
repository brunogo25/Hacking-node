const express = require('express');
const studentsRouter = express.Router();
const {isAuth, isTeacher} = require("../../middlewares/auth")
const {getStudents,register,login, studentProfile} = require("../controllers/students.constroller")


studentsRouter.post("/register", register);
studentsRouter.post("/login", login);
studentsRouter.get('/', getStudents);
studentsRouter.post('/profile', studentProfile);



module.exports = studentsRouter;