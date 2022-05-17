const { User } = require("../db")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const { secret } = require("../config")

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ where: { username } })
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже создан" })
      }
      const hashPassword = bcrypt.hashSync(password, 5)
      const user = new User({ username, password: hashPassword })
      await user.save()
      return res.status(200).redirect("/auth/login")
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username } })
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не зарегистрирован` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: "Введён неверный пароль" })
      }
      const token = generateAccessToken(user.id, user.username)
      res.cookie("token", token)
      return res.status(200).redirect("/post/posts")
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Login error" })
    }
  }
}

module.exports = new authController()
