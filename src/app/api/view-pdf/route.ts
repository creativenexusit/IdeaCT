import { NextRequest, NextResponse } from "next/server";

function toForceDownloadUrl(url: string): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("fl_attachment")) return url;
  if (url.includes("/raw/upload/")) return url;
  return url.replace("/upload/", "/upload/fl_attachment/");
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  const fetchUrl = toForceDownloadUrl(url);

  try {
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch PDF: ${response.statusText}`, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF Proxy Error:", error);
    return new NextResponse("Internal Server Error while proxying PDF", { status: 500 });
  }
}
