import {createConnection} from "typeorm"
import {models} from "./models";

import express from "express"
import * as process from "process";

const router = require("./routes")
const cors = require('cors')
const PORT =  4000 || process.env

const app = express()
const main = async () => {
    try {
      const connection = await createConnection({
            type: "postgres",
            host: "postgres",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "Bookmail",
            entities: models,
            synchronize: true
        })
        console.log("Connected to Postgres")
        app.use(cors())
        app.use(express.json())
        app.use(router)


        app.listen(PORT,"0.0.0.0",  () => {
            console.log(`Server running on port: ${PORT}`)
        })

    } catch (e) {
        console.log(e)
        console.error("Unable to connect to Postgres")
        throw new Error("Unable to connect to db")
    }

}

main()

