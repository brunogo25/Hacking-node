const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Students = require("../api/models/students.models");

const studentsArray = [
    {
        name: "Anonimus",
        age: 1000,
        email: "Anonimus@hacker.com",
        password: "anonimo1234",
        courses: ["64c0f53c42bdfc4ee08a7948","64c0f53c42bdfc4ee08a7949"],
        role: "admin"
    },
    {
        name: "Obama",
        age: 58,
        email: "Obama@hack.com",
        password: "badtrump1234",
        courses: ["64c0f53c42bdfc4ee08a7948","64c0f53c42bdfc4ee08a794a"],
        role: "student",
    },{
        name: "Trump",
        age: 68,
        email: "Trump@hacking.com",
        password: "trumpet123",
        courses: ["64c0f53c42bdfc4ee08a7948","64c0f53c42bdfc4ee08a7949"],
        role: "teacher"
    },
  ];

const DB_URL= process.env.DB_URL;

mongoose.connect(DB_URL)
.then(async()=> {
    const allStudents = await Students.find();
    if (allStudents.length > 0) {
        await Students.collection.drop();
        console.log("collection delete");
    }
})
.catch((error)=> console.log("Retry",error))

.then(async ()=> {
    const studentsMap = studentsArray.map((student) => new Students(student));
    await Students.insertMany(studentsMap);
    console.log("ok 2");
})
.catch((error) => console.log("Error", error))
.finally(()=> mongoose.disconnect())