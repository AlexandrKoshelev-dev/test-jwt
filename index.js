const express = require("express")
const PORT = process.env.PORT || 3000
const authRouter = require("./routers/authRouter")
const postRouter = require("./routers/postRouter")
const app = express()
const cookieParser = require("cookie-parser")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(cookieParser("secret key"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRouter)
app.use("/post", postRouter)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Rest API для теста",
      description: "Информация по API",
      contact: {
        name: "Александр Кошелев",
      },
      servers: ["localhost:3000"],
    },
  },
  // ['.routes/*.js']
  apis: ["./routers/authRouter.js", "./routers/postRouter.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server run on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
