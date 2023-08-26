const Class = require("../models/class.models")

const getClass = async (req, res) => {
    
    try {
      const allClass = await Class.find();
      return res.status(200).json(allClass);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

const getOneClass = async (req, res) => {
    try {
        const { id } = req.params
        const oneClass = await Class.findById(id)
        return res.status(200).json(oneClass)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneClassByName = async (req, res) => {
    try {
        const {name} = req.params
        const oneClassByName = await Class.findOne({name:req.params.name});
        return res.status(200).json(oneClassByName)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneClassByType = async (req, res) => {
    try {
        const {Type} = req.params
        const oneClassByType = await Class.find({genere:req.params.Type});
        return res.status(200).json(oneClassByType)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const postClass = async (req, res) => {
    try {
        console.log(req.body)
        const newClass = new Class(req.body)
        
        const createdClass = await newClass.save()
        return res.status(201).json(createdClass)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const putClass = async (req, res) => {
      try {
        console.log(req.params)
          const { id } = req.params
          const putClasses = new Class(req.body)
          putClasses._id = id;
          const updateClass = await Class.findByIdAndUpdate(id, putClasses, { new: true })
          if (!updateClass) {
              return res.status(404).json({ message: "There is no class with this id" })
          }
          return res.status(200).json(updateClass)
      } catch (error) {
          return res.status(500).json(error)
      }
  }

const deleteClass= async (req, res) => {
    try {
        const { id } = req.params
        const deleteClass = await Class.findByIdAndDelete(id)
        if (!deleteClass) {
            return res.status(404).json({ message: "This id doesnt exist" })
        }
        return res.status(200).json(deleteClass)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {getClass, getOneClass, getOneClassByName, getOneClassByType,deleteClass, postClass, putClass}
