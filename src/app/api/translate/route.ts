import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const targetLang = searchParams.get("tl") || "my"; // default to Myanmar ("my")

  if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    const res = await fetch(url);
    const data = await res.json();

    let translatedText = "";
    if (data && data[0] && Array.isArray(data[0])) {
      translatedText = data[0].map((part: any) => part[0]).filter(Boolean).join(" ");
    } else if (data?.[0]?.[0]?.[0]) {
      translatedText = data[0][0][0];
    }

    return NextResponse.json({ translated: translatedText.trim() });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
