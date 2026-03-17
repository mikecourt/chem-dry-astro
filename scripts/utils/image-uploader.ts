import fs from "fs";
import path from "path";
import { writeClient } from "./sanity-client";

const PUBLIC_DIR = path.join(import.meta.dirname || __dirname, "../../public");

export async function uploadImage(imagePath: string): Promise<any | null> {
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  Image not found: ${fullPath}`);
    return null;
  }
  const imageBuffer = fs.readFileSync(fullPath);
  const filename = path.basename(imagePath);
  const asset = await writeClient.assets.upload("image", imageBuffer, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}
