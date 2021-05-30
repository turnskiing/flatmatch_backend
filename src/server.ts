import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

import { createServer } from 'http'

// import index route
import { indexRoute } from "./routes/indexRoute"

// initialize configuration
dotenv.config()

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT

const app = express()


const { DB_USER, DB_PASS } = process.env

// set up the mongoDB connection
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@flatmatch-frankfurt.mhfhi.mongodb.net/FlatMatch?retryWrites=true&w=majority`

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		// tslint:disable-next-line:no-console
		console.log('\n🚀 	Connected to FlatMatch DB\n')
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log('\n🚫 	ERROR: ', err.message, "\n")
	})

mongoose.set('useFindAndModify', false)

// Add the body parsers middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// use the routes
app.use('/', indexRoute)
app.use('/api', indexRoute)

const httpServer = createServer(app)

httpServer.listen(
	{ port },
	(): void => {
		// tslint:disable-next-line:no-console
		console.log(`\n🚀 	Server started at http://localhost:${port}`)
	})