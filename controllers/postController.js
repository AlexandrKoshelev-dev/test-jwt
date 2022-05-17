const { Post } = require("../db")
const { validationResult } = require("express-validator")
const hbs = require("hbs")

class postController {
  async add(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Ошибка при создании поста", errors })
    }
    try {
      const { text, image } = req.body
      await Post.create({
        date: Date.now(),
        text,
        image,
        author: req.user.username,
      })

      return res.status(200).redirect("/post/posts")
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Create post error" })
    }
  }

  async edit(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при редактировании поста", errors })
      }
      const { text, image } = req.body
      const { id } = req.params
      await Post.update(
        {
          text,
          image,
        },
        { where: { id } }
      )
      return res.redirect("/post/posts")
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Login error" })
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params
      await Post.destroy({
        where: { id },
      })
      return res.status(200).redirect("/post/posts")
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.findAll()
      const { username } = req.user
      hbs.registerHelper("ifCond", function (author, id) {
        if (author === username) {
          return new hbs.SafeString(
            `<span><form action='/post/edit${id}' method='get'><button>Редактировать</button></form></span><span><form action='/post/remove${id}' method='post'><button>Удалить</button></form></span>` //прошу прощения за этот костыль
          )
        }
      })

      return res.status(200).render("main.hbs", {
        title: "Посты",
        posts,
        username,
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new postController()
