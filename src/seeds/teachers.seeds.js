const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Teachers = require("../api/models/teachers.models");

const teachersArray = [
    {
        name: "Bruno",
        age: 49,
        yearsOfExperiencie: 12,
        courses: ["64c0f53c42bdfc4ee08a7948","64c0f53c42bdfc4ee08a7949"]
    },
    {
        name: "Brune",
        age: 31,
        yearsOfExperiencie: 6,
        courses: ["64c0f53c42bdfc4ee08a7949","64c0f53c42bdfc4ee08a794a"]
    },
    {
        name: "Brunu",
        age: 22,
        yearsOfExperiencie: 3,
        courses: ["64c0f53c42bdfc4ee08a7948","64c0f53c42bdfc4ee08a794a"]

    },
  ];

const DB_URL= process.env.DB_URL;

mongoose.connect(DB_URL)
.then(async()=> {
    const allTeachers = await Teachers.find();
    if (allTeachers.length > 0) {
        await Teachers.collection.drop();
        console.log("collection delete");
    }
})
.catch((error)=> console.log("Retry",error))

.then(async ()=> {
    const TeachersMap = teachersArray.map((course) => new Teachers(course));
    await Teachers.insertMany(TeachersMap);
    console.log("ok 2");
})
.catch((error) => console.log("Error", error))
.finally(()=> mongoose.disconnect())