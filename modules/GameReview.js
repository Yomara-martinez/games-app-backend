const { DataTypes } = require("sequelize");
const dbConnection = require("../db");

const GameReview = dbConnection.define("Game Review", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    type: DataTypes.ENUM(
      "Action",
      "Action-Adventure",
      "Adventure",
      "Puzzle",
      "Role-Playing",
      "Simulation",
      "Strategy",
      "Sports",
      "MMO",
      "Horror",
      "Fighting",
      "Shooter",
      "Survival",
      "Educational",
    ),
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
      notEmpty: true,
    },
  },
});

module.exports = GameReview;
