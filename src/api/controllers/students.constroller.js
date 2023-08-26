const Students = require("../models/students.models")
const bcrypt = require("bcrypt");

const {generateSign} = require("../../utils/jwt")
const {validateEmail,validatePassword,usedEmail} = require("../../utils/validators")

const getStudents = async (req, res) => {
    
    try {
      const allStudents = await Students.find();
      return res.status(200).json(allStudents);
    } catch (error) {
      return res.status(500).json(error);
    }
};


const register = async (req, res ) => {
    try {
        console.log(req.body);
        const newStudent = new Students(req.body)
        
        if (!validateEmail(newStudent.email)) {
            return res.status(400).json({message:" Invalid Email"})
        }
        if (!validatePassword(newStudent.password)) {
            return res.status(400).json({message:" Invalid Password"})
        }
        if (await usedEmail(newStudent.email)) {
            return res.status(400).json({message:" Email already exists"})
        }

        newStudent.password = bcrypt.hashSync(newStudent.password,10);
        const createdStudent = await newStudent.save();

        return res.status(201).json(createdStudent);


    } catch (error) {
        return res.status(500).json(error)
    }
};

const login = async (req, res) => {
    try {
        const studentInfo = await Students.findOne({email:req.body.email})
        if (!studentInfo) {
            return res.status(404).json({message:"email not found"})
        }
        if (!bcrypt.compareSync(req.body.password,studentInfo.password)) {
            return res.status(404).json({message:"wrong password"})
        }
       const token = generateSign(studentInfo._id,studentInfo.email);

       return res.status(200).json({student:studentInfo,token:token})

    } catch (error) {
        return res.status(500).json(error)
    }
}

const studentProfile = async (req, res) => {
    try {
      return res.status(200).json(req.student);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  

module.exports={register,login,getStudents, studentProfile }
