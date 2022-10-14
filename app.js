const express = require("express")
const upload = require('./routes/upload')
const mint = require("./routes/mint")

const app = express()
app.use(express.json())
app.use('/upload', upload)
app.use("/mint", mint)

app.get('/', (req, res) => {
    res.send("hi")
})

app.listen(3000, () => {
    console.log("started at 3000")
})