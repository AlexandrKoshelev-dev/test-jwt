const Router = require("express")
const router = new Router()
const controller = require("../controllers/postController")
const postMiddleware = require("../middleware/postMiddleware")
const { check } = require("express-validator")

/**
 * @swagger
 * /post/add:
 *  post:
 *    description: Используется для создания нового поста.
 *    responses:
 *      '200':
 *        description: Пост создан
 *      '400':
 *        description: Пост не создан по одному из исключений
 */
router.post(
  "/add",
  [check("text", "Текст поста не должен быть пустым!").notEmpty()],
  postMiddleware,
  controller.add
)
/**
 * @swagger
 * /post/add:
 *  get:
 *    description: Возвращает страницу создания нового поста.
 *    responses:
 *      '200':
 *        description: Страница создания нового поста.
 */
router.get("/add", postMiddleware, (req, res) => {
  return res.render("add.hbs")
})
/**
 * @swagger
 * /post/edit:id:
 *  post:
 *    description: Используется для редактирования поста.
 *    responses:
 *      '200':
 *        description: Пост изменён.
 *      '400':
 *        description: Пост не изменён по одному из исключений.
 */
router.post(
  "/edit:id",
  [check("text", "Текст поста не должен быть пустым!").notEmpty()],
  postMiddleware,
  controller.edit
)
/**
 * @swagger
 * /post/edit:id:
 *  get:
 *    description: Возвращает страницу редактирования поста.
 *    responses:
 *      '200':
 *        description: Страница редактирования поста.
 */
router.get("/edit:id", postMiddleware, (req, res) => {
  return res.render("edit.hbs", {
    id: req.params.id,
  })
})
/**
 * @swagger
 * /post/remove:id:
 *  post:
 *    description: Используется для удаления поста.
 *    responses:
 *      '200':
 *        description: Пост удалён.
 */
router.post("/remove:id", postMiddleware, controller.remove)
/**
 * @swagger
 * /post/posts:
 *  get:
 *    description: Возвращает страницу с постами.
 *    responses:
 *      '200':
 *        description: Страница с постами.
 */
router.get("/posts", postMiddleware, controller.getAll)

module.exports = router
