const { DataTypes } = require("sequelize");
const dbConnection = require("../db");

const WishList = dbConnection.define("wishList", {
    
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
module.exports = WishList