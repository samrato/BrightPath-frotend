require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const buildPrompt = (profile) => `
You are an AI education assistant.

Given this student's profile:

Career Goal: ${profile.careerGoal}
Grades: Math - ${profile.grades.math}, Science - ${profile.grades.science}, English - ${profile.grades.english}, Other - ${profile.grades.other}
Study Time Per Week: ${profile.studyTimePerWeek} hours
Learning Preferences: ${profile.learningPreferences.join(', ')}

Create a JSON array of learning modules. Each module should have:
- title (string)
- description (string)
- resourceLinks (array of URLs)
- completed (boolean, default false)

Respond with ONLY valid JSON.
`;

const extractJSON = (text) => {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (!match) throw new Error("❌ No valid JSON found in Gemini output");

    return JSON.parse(match[0]);
  } catch (err) {
    console.error("❌ JSON parsing failed:", err.message);
    console.error("💬 Gemini raw output:\n", text);
    throw err;
  }
};

const generateLearningPathFromProfile = async (profile) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = buildPrompt(profile);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const parsed = extractJSON(text);
    return parsed.modules || parsed;
  } catch (error) {
    if (error?.response?.text) {
      const raw = await error.response.text();
      console.error("Gemini AI raw output:\n", raw);
    } else {
      console.error("Gemini AI error:\n", error);
    }
    throw new Error("❌ Failed to generate learning path using Gemini AI");
  }
};

module.exports = generateLearningPathFromProfile;
