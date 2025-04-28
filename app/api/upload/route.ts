import { NextResponse } from "next/server";
import { uploadFileToS3 } from "@/lib/s3Client";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    const fileName = await uploadFileToS3(file);
    return NextResponse.json({
      message: "Fichier uploadé avec succès",
      fileName,
    });
  } catch (error) {
    return NextResponse.json({ error: `Erreur: ${error}` }, { status: 500 });
  }
}
