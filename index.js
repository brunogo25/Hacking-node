
const express = require("express")
const dotenv = require("dotenv").config()

const classRouter = require("./src/api/routes/class.route")
const teachersRouter = require("./src/api/routes/teachers.route")
const studentsRouter = require("./src/api/routes/students.route")

const {connect} = require("./src/utils/db")
connect()

let cors = require("cors");


const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json())

app.use("/class", classRouter)
app.use("/teachers", teachersRouter)
app.use("/students", studentsRouter)


app.listen(PORT,() => console.log(`escuchando en el puerto http://localhost:${PORT}`))

