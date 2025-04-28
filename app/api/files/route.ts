import { NextResponse } from "next/server";
import { listFilesFromS3 } from "@/lib/s3Client";

export async function GET() {
  try {
    const files = await listFilesFromS3();
    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ error: `Erreur: ${error}` }, { status: 500 });
  }
}
