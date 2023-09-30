const jwt = require("jsonwebtoken")
const adminModel = require('../model/adminModel');

module.exports = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
      console.log("yess")
      const token = req.headers.authorization.split(" ").pop()
      
      const { user_id } = jwt.verify(token, "privateKey")
      req.user = await adminModel.findOneAndUpdate({ _id: user_id, isdeleted: false }, { token }, { new: true })
      if (req.user.verificationStatus !=false) {
        next()
      } else {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
          data: []
        })
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Token Not Found",
        data: []
      })
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid Token",
      data: []
    })
  }
}