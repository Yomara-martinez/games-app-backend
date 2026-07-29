const {Sequelize} = require ("sequelize")

const dbConnection = new Sequelize(process.env.DATABASE_URL,{
    dialect: "postgres",
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
   // }
})

module.exports = dbConnection