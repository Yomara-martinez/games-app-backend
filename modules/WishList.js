const { DataTypes } = require("sequelize");
const dbConnection = require("../db");

const WishList = dbConnection.define("wishList", {

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  gameReviewId:{
type: DataTypes.INTEGER,
allowNull: false,
unique: true,
  }
}
)
module.exports = WishList