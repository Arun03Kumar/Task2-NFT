const express = require("express")
const mintFunc = require("../scripts/mint")
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config()

const Metadata = require("../schema/Metadata")

const route = express.Router()

// var data = new FormData();
// data.append(
//   "file",
//   fs.createReadStream("/home/arun/Desktop/task2_nft/metadata2.json")
// );
// data.append("pinataOptions", '{"cidVersion": 1}');
// data.append(
//   "pinataMetadata",
//   '{"name": "metadata2", "keyvalues": {"company": "Pinata"}}'
// );

// var config = {
//   method: "post",
//   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//   headers: {
//     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjZDliMzE2Zi0zNGI4LTRiMjYtYmU0ZS04MzZiNzc2ODVjOWEiLCJlbWFpbCI6IjBhcnVua3VtYXIxNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmU5NDU0ZmEwY2QxMjBkZjQ3ZTgiLCJzY29wZWRLZXlTZWNyZXQiOiJjM2VlNzU5MWQzZDBiM2E2MDg1NWRmOWIyZGU3Y2FiNzZiMzdjYWM4ZjQwZDUxYmZjMmE0NmI0Yzc3NGZlMDNiIiwiaWF0IjoxNjY1NjU2NDEzfQ.SuWy7q35knw6YL_jZ93_7upRbf2aR6eCLuj80VbD9Z8",
//     ...data.getHeaders(),
//   },
//   data: data,
// };

route.post('/:api/', async (req, res) => {
    const urlApi = req.params.api
    if(urlApi != process.env.API_KEY){
        res.status(200).send("invalid Api key")
        return
    }
    var data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: "testing",
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataContent: {
        ...req.body
      },
    });
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: process.env.PINATA_API,
        pinata_secret_api_key: process.env.PINATA_SERET_KEY,
      },
      data: data,
    };
    // console.log(req.body)
    const resp = await axios(config);
    const mintedHash = await mintFunc(
      `https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash}`
    );
    console.log(resp.data)
    res
      .status(200)
      .send(`see your file at: https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash} and minted NFT hash ${mintedHash}`);
})



module.exports = route