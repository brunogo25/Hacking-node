const Teachers = require("../models/teachers.models")

const getTeachers = async (req, res) => {
    
    try {
      const allTeachers = await Teachers.find().populate("courses");
      return res.status(200).json(allTeachers);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  
  const postTeacher = async (req, res) => {
      try {
          const newTeacher = new Teachers(req.body)
          const createdTeacher = await newTeacher.save()
          return res.status(201).json(createdTeacher)
      } catch (error) {
          return res.status(500).json(error)
      }
  }
  
  const putTeacher = async (req, res) => {
      try {
          const { id } = req.params
          const putTeachers = new Teachers(req.body)
          putTeachers._id = id;
          const updateTeacher = await Teachers.findByIdAndUpdate(id, putTeachers, { new: true })
          if (!updateTeacher) {
              return res.status(404).json({ message: "There is no Teacher with this id" })
          }
          return res.status(200).json(updateTeacher)
      } catch (error) {
          return res.status(500).json(error)
      }
  }
  
  const deleteTeacher = async (req, res) => {
      try {
          const { id } = req.params
          const deleteTeacher = await Teachers.findByIdAndDelete(id)
          if (!deleteTeacher) {
              return res.status(404).json({ message: "This id doesnt exist" })
          }
          return res.status(200).json(deleteTeacher)
      } catch (error) {
          return res.status(500).json(error)
      }
  }
  
  module.exports = { getTeachers, postTeacher, putTeacher, deleteTeacher }
