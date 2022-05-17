const Router = require("express")
const router = new Router()
const controller = require("../controllers/authController")
const { check } = require("express-validator")

/**
 * @swagger
 * /auth/registration:
 *  post:
 *    description: Используется для регистрации нового пользователя.
 *    responses:
 *      '200':
 *        description: Успешная регистрация нового пользователя
 *      '400':
 *        description: Неуспешная регистрация пользователя по одному из исключений
 */
router.post(
  "/registration",
  [
    check("username", "Имя пользователя не должно быть пустым!").notEmpty(),
    check(
      "password",
      "Пароль пользователя должен быть длиннее 4 символов"
    ).isLength({ min: 4 }),
  ],
  controller.registration
)
/**
 * @swagger
 * /auth/registration:
 *  get:
 *    description: Возвращает страницу регистрации нового пользователя
 *    responses:
 *      '200':
 *        description: Страница регистрации нового пользователя
 */
router.get("/registration", (req, res) => {
  return res.status(200).render("registration.hbs")
})
/**
 * @swagger
 * /auth/login:
 *  post:
 *    description: Используется для авторизации пользователя.
 *    responses:
 *      '200':
 *        description: Успешная авторизация пользователя
 *      '400':
 *        description: Неуспешная авторизация пользователя по одному из исключений
 */
router.post("/login", controller.login)
/**
 * @swagger
 * /auth/login:
 *  get:
 *    description: Возвращает страницу авторизации пользователя
 *    responses:
 *      '200':
 *        description: Страница авторизации нового пользователя
 */
router.get("/login", (req, res) => {
  return res.render("login.hbs")
})
/**
 * @swagger
 * /auth/logout:
 *  get:
 *    description: Возвращает страницу авторизации пользователя. Очищает cookie с jwt
 *    responses:
 *      '200':
 *        description: Страница авторизации нового пользователя. Cookie очищены
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token")
  return res.render("login.hbs")
})
module.exports = router
