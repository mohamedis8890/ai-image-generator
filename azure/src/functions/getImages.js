const { app } = require("@azure/functions");

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const generateSASToken = require("../../lib/generateSASToken");
const { DefaultDeserializer } = require("v8");
const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const sasToken = await generateSASToken();

    const imageUrls = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      const imagePath = `${blob.name}`;
      const imageUrl = `https://${accountName}.blob.core.windows.net/images/${imagePath}`;
      imageUrls.push({ url: imageUrl, name: blob.name });
    }

    const sortedUrls = imageUrls.sort((a, b) => {
      const aName = a.name.split("_").pop().toString().split(".").shift();
      const bName = b.name.split("_").pop().toString().split(".").shift();
      return bName - aName;
    });
    context.log("Http function processed request for url: " + request.url);

    return {
      jsonBody: { imageUrls: sortedUrls },
    };
  },
});
