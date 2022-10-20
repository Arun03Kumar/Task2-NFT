const express = require("express")
const mintFunc = require("../scripts/mint")

const route = express.Router()

const api = "abcdefg"

route.post('/:api', async (req, res) => {
    const urlApi = req.params.api
    if(urlApi != process.env.API_KEY) {
        res.status(200).send("invalid api")
    }
    else{
        const hash = await mintFunc(req.body.uri)
        res.status(200).send(hash)
    }
})


module.exports = route