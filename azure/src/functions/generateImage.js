const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName;
const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = await request.json();

    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = res.data.data[0].url;
    console.log(imageUrl);
    const bufferRes = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const buffer = bufferRes.data;

    const sasToken = await generateSASToken();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const timeStamp = new Date().getTime();
    const fileName = `${prompt}_${timeStamp}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    try {
      await blockBlobClient.uploadData(buffer);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("File Upload Error: ", error.message);
    }

    return { body: "Successfully Uploaded Image" };
  },
});
