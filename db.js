const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("test-jwt", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
})

const User = sequelize.define(
  "Users",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  { timestamps: false }
)

const Post = sequelize.define(
  "Posts",
  {
    date: DataTypes.DATE,
    text: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false }
)

Post.belongsTo(User, { targetKey: "username", foreignKey: "author" })
;(async () => {
  await sequelize.sync()
  console.log("db init")
})()

module.exports = { User, Post }
