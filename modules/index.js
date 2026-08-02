// models/index.js — one place to collect all models and their relationships.
// Lets the rest of the app grab them from here: const { Task } = require('./models')
const {Sequelize} = require ("sequelize")

const dbConnection = require('../db');
const GameReview= require('./GameReview');
const User = require('./Users');
const WishList = require("./WishList")

User.hasMany(GameReview,{
foreignKey: "userId"
})

GameReview.belongsTo(User,{
foreignKey: "userId"
})
// ---------- associations ----------
// Describe how tables relate here. When you're ready to tie tasks to their
// owner, uncomment these (it adds a userId column to tasks):
//   User.hasMany(Task)     // one user has many tasks
//   Task.belongsTo(User)   // each task belongs to one user (adds a userId column)

User.hasMany(WishList, {
    foreignKey: "userId"
})

WishList.belongsTo(User,{
    foreignKey: "userId"
})

GameReview.hasMany(WishList,{
 foreignKey: "gameReviewId"
})

WishList.belongsTo(GameReview,{
 foreignKey: "gameReviewId"
})
module.exports = {
  dbConnection, // exported too so seed.js can sync from one place
  GameReview,
  User,
  WishList,
  Sequelize
};