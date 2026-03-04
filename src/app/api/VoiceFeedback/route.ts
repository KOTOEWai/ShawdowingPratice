import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    const startTime = Date.now();
    try {
        console.log("Voice Feedback API: Request received");
        const formData = await req.formData();
        const audioFile = formData.get("audio") as Blob;
        const originalText = formData.get("originalText") as string;

        if (!audioFile || !process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "No audio file or API Key provided" }, { status: 400 });
        }

        const arrayBuffer = await audioFile.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString("base64");

        console.log("Voice Feedback API: Sending to Gemini...");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an English pronunciation expert. 
        Transcribe the following audio precisely. 
        Original target text: "${originalText}"
        Only respond with the exact transcription of the audio. Do not include any other text.`;

        const result = await model.generateContent([
            {
                inlineData: {
                    data: base64Audio,
                    mimeType: audioFile.type || "audio/webm",
                },
            },
            { text: prompt },
        ]);

        const userText = result.response.text().trim();
        const accuracy = calculateAccuracy(originalText, userText);

        console.log(`Voice Feedback API Success: Accuracy ${accuracy}%`);
        return NextResponse.json({ userText, accuracy, originalText });

    } catch (error: any) {
        console.error(`Voice Feedback API Final Error:`, error);
        return NextResponse.json(
            { error: `API Error: ${error.message}` },
            { status: 500 }
        );
    }
}

function calculateAccuracy(original: string, recognized: string): number {
    const normalize = (str: string) => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const origWords = normalize(original).split(/\s+/).filter(w => w.length > 0);
    const recWords = normalize(recognized).split(/\s+/).filter(w => w.length > 0);
    if (origWords.length === 0) return 0;
    const recSet = new Set(recWords);
    let matchCount = 0;
    origWords.forEach(word => {
        if (recSet.has(word)) matchCount++;
    });

    return Math.min(100, Math.round((matchCount / origWords.length) * 100));
}
