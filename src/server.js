import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mongoose from "mongoose"
import postsRouter from "./api/posts/index.js"
import commentsRouter from "./api/comments/index.js"

const server = express()
const port = process.env.PORT || 3001

// ******************************* MIDDLEWARES ****************************************
server.use(cors())
server.use(express.json())

// ******************************** ENDPOINTS *****************************************
server.use("/posts", postsRouter)
server.use('/', commentsRouter)

// ***************************** ERROR HANDLERS ***************************************
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!")
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is running on port ${port}`)
  })
})