import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// Configuration du client S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Fonction pour uploader un fichier vers S3
export async function uploadFileToS3(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    },
  });

  try {
    await upload.done();
    return fileName;
  } catch (error) {
    throw new Error(`Erreur lors de l'upload: ${error}`);
  }
}

// Fonction pour lister les fichiers dans le bucket S3
export async function listFilesFromS3(): Promise<string[]> {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
  });

  try {
    const data = await s3Client.send(command);
    return data.Contents?.map((item) => item.Key!) || [];
  } catch (error) {
    throw new Error(`Erreur lors du listage: ${error}`);
  }
}
