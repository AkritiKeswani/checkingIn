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
    const prompt = `Analyze this health/fitness screenshot and extract the numerical health metrics. Respond with JSON in this exact format:
{
  "sleepHours": number or null,
  "recoveryPercent": number or null,
  "strain": number or null,
  "hrv": number or null,
  "restingHeartRate": number or null,
  "steps": number or null,
  "calories": number or null
}`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType,
        },
      },
      `You are a health data extraction expert. Analyze this health/fitness screenshot and extract numerical health metrics.

Look for the following metrics and extract their exact numerical values:
- Sleep hours (total sleep time)
- Recovery percentage (recovery score)
- Strain (daily strain or exertion level)
- HRV (Heart Rate Variability in ms)
- Resting heart rate (BPM)
- Steps (daily step count)
- Calories (calories burned or active calories)

${prompt}

Only include values that are clearly visible and readable in the image. Set to null if not found.`,
      ],
    });

    const rawJson = response.text;
    console.log(`Raw JSON response: ${rawJson}`);

    if (rawJson) {
      const metrics: HealthMetrics = JSON.parse(rawJson);
      return metrics;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Error extracting health metrics:", error);
    throw new Error(`Failed to extract health metrics: ${error}`);
  }
}