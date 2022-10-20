const mongoose = require("mongoose")

const MetadataSchema = mongoose.Schema({
    nft_name: {type: String, required: true},
    nft_desc: {type: String, required: true},
    img_url: {type:String},
    attribures: {type: Object}
})

const Metadata = mongoose.model("Metadata", MetadataSchema)
module.exports = Metadata