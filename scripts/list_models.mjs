import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Simple env reader
const envPath = path.join(process.cwd(), ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const geminiKey = envContent.match(/GEMINI_API_KEY=(.*)/)?.[1]?.trim();

if (!geminiKey) {
    console.error("GEMINI_API_KEY not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiKey);

async function listModels() {
    try {
        console.log("Checking API Key:", geminiKey.substring(0, 8) + "...");
        const result = await genAI.listModels();
        console.log("Available Models:");
        result.models.forEach((m) => {
            console.log(`- ${m.name} (${m.displayName}) - Methods: ${m.supportedGenerationMethods.join(", ")}`);
        });
    } catch (error) {
        console.error("Failed to list models:", error);
    }
}

listModels();
