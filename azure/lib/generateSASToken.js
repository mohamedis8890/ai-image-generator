const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

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

async function generateSASToken() {
  const client = blobServiceClient.getContainerClient(containerName);
  const permissions = new BlobSASPermissions();

  permissions.write = true;
  permissions.read = true;
  permissions.create = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: client.containerName,
      permissions: permissions.toString(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}

module.exports = generateSASToken;
