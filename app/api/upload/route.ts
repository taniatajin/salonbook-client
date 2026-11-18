import { NextResponse } from "next/server";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No image file provided" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "Only JPG, PNG or WEBP images are allowed" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ message: "Image must be 2MB or smaller" }, { status: 400 });
    }

    const body = new FormData();
    body.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body }
    );
    const data = await res.json();

    if (!res.ok || !data.success) {
      return NextResponse.json({ message: "Image upload failed" }, { status: 502 });
    }

    return NextResponse.json({ url: data.data.url as string });
  } catch {
    return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
  }
}