const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require("./routers") );

app.listen(5000 , () => {
    console.log('Server is up on port 5000.')
})