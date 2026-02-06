// src/app/api/translate/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  
  if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });
  try {
    // Google Translate Free API (unofficial) ကို အသုံးပြုခြင်း
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=my&dt=t&q=${encodeURIComponent(text)}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    // Google API response က array ပုံစံလာတာဖြစ်လို့ [0][0][0] ကို ယူရပါမယ်
    const translatedText = data[0][0][0];
    
    return NextResponse.json({ translated: translatedText });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}