import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const markerFiles = [
  {
    name: "marker-icon.png",
    url: "https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-icon.png"
  },
  {
    name: "marker-icon-2x.png",
    url: "https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-icon-2x.png"
  },
  {
    name: "marker-shadow.png",
    url: "https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-shadow.png"
  }
];

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public", "assets");
    
    // Create assets directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const file of markerFiles) {
      const response = await fetch(file.url);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(path.join(publicDir, file.name), Buffer.from(buffer));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error downloading marker files:", error);
    return NextResponse.json({ success: false, error: "Failed to download marker files" }, { status: 500 });
  }
} 