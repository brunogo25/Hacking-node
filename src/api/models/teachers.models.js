const mongoose = require("mongoose")

const Schema = mongoose.Schema
const teacherSchema = new Schema({
    name: { type: String, requires: true},
    age: { type: Number, requires: true},
    yearsOfExperiencie: { type: Number, requires: true},
    courses: [{ type: Schema.ObjectId, required: true , ref: 'class'}]
},{
    collection: "Teachers"
}
)

const Teacher = mongoose.model("teachers", teacherSchema)
module.exports = Teacher

