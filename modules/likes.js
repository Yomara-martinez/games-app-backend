const { DataTypes } = require("sequelize");
const dbConnection = require("../db");

const Likes = dbConnection.define("likes", {
    
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  gameReviewId:{
type: DataTypes.INTEGER,
allowNull: false,

  }
}
)
module.exports = Likes