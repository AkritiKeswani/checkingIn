// From the javascript_gemini integration - leave a comment referencing this integration
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface HealthMetrics {
  sleepHours?: number;
  recoveryPercent?: number;
  strain?: number;
  hrv?: number;
  restingHeartRate?: number;
  steps?: number;
  calories?: number;
}

export async function extractHealthMetrics(imageBuffer: Buffer, mimeType: string): Promise<HealthMetrics> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType,
        },
      },
      `You are a health data extraction expert. CAREFULLY analyze this health/fitness screenshot and extract the ACTUAL numerical values visible in the image.

CRITICAL: Look at ALL text, numbers, and labels in the image. Extract the exact numbers you can see, even if they have units, commas, or formatting.

Examples of what to extract:
- Steps: "8,964" → extract as 8964
- Calories: "1919", "2,150 cal" → extract as 1919 or 2150
- Sleep: "7.5 hrs", "8h 23m" → extract as 7.5 or 8.38
- Recovery: "85%", "Recovery 72" → extract as 85 or 72
- Strain: "12.5", "Strain: 8" → extract as 12.5 or 8
- HRV: "45 ms", "HRV 62" → extract as 45 or 62
- Heart Rate: "68 bpm", "RHR: 72" → extract as 68 or 72

IMPORTANT INSTRUCTIONS:
1. Look at every visible number in the image, including small text
2. Convert formatted numbers (remove commas, convert "K" to thousands)
3. Extract numbers even if they have units (bpm, ms, %, hrs, cal)
4. Only return null if the metric truly doesn't exist in the image
5. Be very precise - extract the exact numbers you see

Return JSON in this exact format:
{
  "sleepHours": number or null,
  "recoveryPercent": number or null,
  "strain": number or null,
  "hrv": number or null,
  "restingHeartRate": number or null,
  "steps": number or null,
  "calories": number or null
}`,
      ],
    });

    const rawJson = response.text;
    console.log(`Raw JSON response: ${rawJson}`);

    if (rawJson) {
      try {
        // Clean the response - remove markdown code blocks if present
        let cleanJson = rawJson.trim();
        if (cleanJson.startsWith('```json')) {
          cleanJson = cleanJson.replace(/```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanJson.startsWith('```')) {
          cleanJson = cleanJson.replace(/```\n?/, '').replace(/\n?```$/, '');
        }
        
        const metrics: HealthMetrics = JSON.parse(cleanJson);
        return metrics;
      } catch (parseError) {
        console.error("Failed to parse JSON response:", rawJson);
        throw new Error(`Invalid JSON response from Gemini: ${parseError}`);
      }
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Error extracting health metrics:", error);
    throw new Error(`Failed to extract health metrics: ${error}`);
  }
}