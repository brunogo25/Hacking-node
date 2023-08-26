const mongoose = require("mongoose")

const Schema = mongoose.Schema

const studentsSchema = new Schema({
    name: { type: String, requires: true},
    age: { type: Number, requires: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    courses: [{ type: Schema.ObjectId, required: true , ref: "class" }],
    role:{type:String, default:"student", enum:["teacher","student","admin"]},
},{
    collection: "students"
}
)

const students = mongoose.model("students", studentsSchema)
module.exports = students