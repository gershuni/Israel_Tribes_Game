
import { GoogleGenAI } from "@google/genai";
import { TribeId, Language } from "../types";
import { TRIBES } from "../constants";

// Note: Process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTribeFact = async (tribeId: TribeId, language: Language): Promise<string> => {
  const tribe = TRIBES.find(t => t.id === tribeId);
  const tribeName = tribe ? tribe.name[language] : tribeId;

  try {
    const prompt = language === 'he' 
      ? `Write a short, fascinating historical or biblical fact (maximum 2 sentences) in Hebrew about the Tribe of ${tribeName} (שבט ${tribeName}). 
        CRITICAL INSTRUCTIONS:
        1. Source material must be STRICTLY from the Tanakh (Hebrew Bible), Midrash, or Talmud.
        2. DO NOT mention Jesus, the New Testament, or any Christian figures/texts.
        3. Focus on the tribe's blessing from Jacob/Moses, their symbol, or a famous figure from that tribe.
        4. Do not mention specific geographical boundaries.`
      : `Write a short, fascinating historical or biblical fact (maximum 2 sentences) in English about the Tribe of ${tribeName}. 
        CRITICAL INSTRUCTIONS:
        1. Source material must be STRICTLY from the Tanakh (Hebrew Bible), Midrash, or Talmud.
        2. DO NOT mention Jesus, the New Testament, or any Christian figures/texts.
        3. Focus on the tribe's blessing from Jacob/Moses, their symbol, or a famous figure from that tribe.
        4. Do not mention specific geographical boundaries.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || (language === 'he' ? `לא נמצא מידע על שבט ${tribeName}` : `No information found for Tribe ${tribeName}`);
  } catch (error) {
    console.error("Error fetching fact:", error);
    return language === 'he' 
      ? `כל הכבוד! זיהית נכון את שבט ${tribeName}.` 
      : `Well done! You correctly identified the Tribe of ${tribeName}.`;
  }
};
