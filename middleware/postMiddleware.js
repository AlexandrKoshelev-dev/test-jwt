const jwt = require("jsonwebtoken")
const { secret } = require("../config")

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(400).json({ message: "Пользователь не авторизован" })
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: "Пользователь не авторизован" })
  }
}
