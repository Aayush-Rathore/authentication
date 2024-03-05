import { PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs/promises";

// Create an S3 service client object.
interface UploadInterface {
  filePath: string;
  fileName: string;
}

class S3Helper {
  private credentials = {
    accessKeyId: process.env.AWS_S3_ACCEESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  };

  private s3Client(): S3Client {
    const s3 = new S3Client({
      endpoint: process.env.AWS_S3_END_POINT,
      credentials: this.credentials,
      region: process.env.AWS_S3_REGION,
    });
    return s3;
  }

  public async uploadToCloud({ filePath, fileName }: UploadInterface) {
    const file = await fs.readFile(filePath);
    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ACL: "public-read",
    };

    const s3 = this.s3Client();
    const upload: Upload = new Upload({
      client: s3,
      params: uploadParams,
    });
    const metaData = await upload.done();
    fs.unlink(filePath);
    return metaData["Location"];
  }
}

export default S3Helper;
