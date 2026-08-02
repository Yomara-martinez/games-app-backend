const { DataTypes } = require("sequelize");
const dbConnection = require("../db");

const Dislikes = dbConnection.define("Dislikes", {
    
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
module.exports = Dislikes