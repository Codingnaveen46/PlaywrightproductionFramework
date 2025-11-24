import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.AWS_S3_BUCKET;
const region = process.env.AWS_REGION || "us-east-1";
const reportDir = path.resolve(__dirname, "../allure-report");

if (!bucketName) {
  console.error("Error: AWS_S3_BUCKET environment variable is not set.");
  process.exit(1);
}

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

async function uploadFile(filePath: string, fileKey: string) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: fileContent,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    console.log(`Uploaded: ${fileKey}`);
  } catch (err) {
    console.error(`Failed to upload ${fileKey}:`, err);
  }
}

async function uploadDirectory(dir: string, baseDir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await uploadDirectory(filePath, baseDir);
    } else {
      const relativePath = path.relative(baseDir, filePath);
      // Replace backslashes with forward slashes for S3 keys (Windows compatibility)
      const fileKey = relativePath.replace(/\\/g, "/");
      await uploadFile(filePath, fileKey);
    }
  }
}

async function main() {
  if (!fs.existsSync(reportDir)) {
    console.error(`Report directory not found: ${reportDir}`);
    console.error("Please run 'npm run report:generate' first.");
    process.exit(1);
  }

  console.log(`Starting upload to bucket: ${bucketName}`);
  await uploadDirectory(reportDir, reportDir);
  console.log("Upload complete!");
  console.log(`Report URL: http://${bucketName}.s3-website.${region}.amazonaws.com`);
}

main();
