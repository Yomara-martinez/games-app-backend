const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const dbConnection =require("./db")
const PORT = process.env.PORT || 8080
const app = express()

const GameReview= require("./modules/Games")
const router = require("./routes/games")

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use("/", router)

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(500).json()
})
async function startApp(){
    await dbConnection.sync()
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
}

startApp()