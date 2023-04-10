const express = require('express')
const app = express()
const cors=require("cors")

const corsOptions = {
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require("./routers") );

app.listen(5000 , () => {
    console.log('Server is up on port 5000.')
})