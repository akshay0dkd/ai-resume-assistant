const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()


app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Require All the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


// Using All the routes here

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app