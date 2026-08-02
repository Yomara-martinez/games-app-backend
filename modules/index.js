// models/index.js — one place to collect all models and their relationships.
// Lets the rest of the app grab them from here: const { Task } = require('./models')
const {Sequelize} = require ("sequelize")

const dbConnection = require('../db');
const GameReview= require('./GameReview');
const User = require('./Users');
const WishList = require("./WishList")
const Dislikes = require("./Dislikes")
const Likes = require("./likes")


User.hasMany(GameReview,{
foreignKey: "userId"
})

GameReview.belongsTo(User,{
foreignKey: "userId"
})


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

User.hasMany(Likes,{
     foreignKey: "userId"
})
Likes.belongsTo(User, {
     foreignKey: "userId"
})

GameReview.hasMany(Likes,{
     foreignKey: "userId"
})

Likes.belongsTo(GameReview,{
     foreignKey: "userId"
})


User.hasMany(Dislikes,{
     foreignKey: "userId"
})
Dislikes.belongsTo(User, {
     foreignKey: "userId"
})

GameReview.hasMany(Dislikes,{
     foreignKey: "userId"
})

Dislikes.belongsTo(GameReview,{
     foreignKey: "userId"
})
module.exports = {
  dbConnection, // exported too so seed.js can sync from one place
  GameReview,
  User,
  WishList,
  Sequelize,
  Likes,
  Dislikes
};