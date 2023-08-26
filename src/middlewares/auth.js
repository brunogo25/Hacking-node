const Student = require("../api/models/students.models");
const {verifySign} = require("../utils/jwt");

const pruebaMiddleware = (req,res,next) => {
    console.log("This is my middleware function");
    next();
}

const isAuth = async( req,res,next) =>{
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).json({message:"unauthorized"})
        }
        const token = authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({message:"invalid or inexistent token"})
        }
        const tokenVerified = verifySign(token);
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified)
        }
        const studentLogged = await Student.findById(tokenVerified.id);
        req.student = studentLogged;
        next()
    } catch (error) {
        return res.status(500).json(error)
    }
}

const isAdmin = async( req,res,next) =>{
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).json({message:"no estas autorizado"})
        }
        const token = authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({message:"el token es invalido o no existe"})
        }
        const tokenVerified = verifySign(token);
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified)
        }
        const studentLogged = await Student.findById(tokenVerified.id);
        req.student = studentLogged;
        if (studentLogged.role !== "admin") {
            return res.status(401).json({message:"You aren't admin"})
        }
        next()

    } catch (error) {
        return res.status(500).json(error)
    }
}

const isTeacher = async( req,res,next) =>{
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).json({message:"unauthorized teacher"})
        }
        const token = authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({message:"invalid or inexistent token"})
        }
        const tokenVerified = verifySign(token);
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified)
        }
        const studentLogged = await Student.findById(tokenVerified.id);
        req.student = studentLogged;
        if (studentLogged.role !== "teacher") {
            return res.status(401).json({message:"you aren't teacher"})
        }
        next()

    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {pruebaMiddleware,isAuth,isAdmin, isTeacher}