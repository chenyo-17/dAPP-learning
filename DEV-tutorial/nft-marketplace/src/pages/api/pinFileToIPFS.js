require("dotenv").config();

import FormData from "form-data";
const fs = require("fs");
const path = require("path");

const PINATA_JWT = process.env.PINATA_JWT;

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { fileUrl, name, description } = req.body;
    const fileUrl = "mal.png";
    try {
      // source: https://docs.pinata.cloud/pinning/pinning-files
      const formData = new FormData();
      const file = fs.createReadStream(fileUrl);
      formData.append("file", file);
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      };
      options.body = formData;
      // formData.append("pinataMetadata", JSON.stringify({ name: "mal" }));
      // formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
      //
      const res = await fetch(
        "https:api.pinata.cloud/pinning/pinFileToIPFS",
        options
      );

      // const res = await fetch(
      //   "https://api.pinata.cloud/pinning/pinFileToIPFS",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${PINATA_JWT}`,
      //     },
      //     body: formData,
      //   }
      // );
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }
}
