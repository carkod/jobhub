import GeminiApi from "./GeminiApi.js";

const PROMPT = "Adapt my CV to this job description";

const extractJson = (text) => {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(cleaned);
};

export const buildCvPrompt = (baselineCv, job) => `${PROMPT}.

Return only valid JSON. Keep the exact top-level shape of the baseline CV and preserve factual personal details, employers, dates, education and qualifications. Tailor only the summary, wording, ordering and skills to emphasize relevant experience. Do not invent experience or credentials. Set name and navName to a concise title that includes the target job and business, and set cats.status to "draft".

Job details:
${JSON.stringify(job, null, 2)}

Baseline CV:
${JSON.stringify(baselineCv, null, 2)}`;

const factKey = (item = {}) =>
  [item.company, item.date].map((value) => String(value || "").trim().toLowerCase()).join("|");

// Keep company, position and date from the baseline. Take only the reworded desc
// and the new order from the model. Items the model drops or changes keep their baseline text.
export const mergeWorkExp = (generatedItems, baselineItems = []) => {
  if (!Array.isArray(generatedItems)) return baselineItems;
  const remaining = [...baselineItems];
  const merged = [];
  generatedItems.forEach((item) => {
    const index = remaining.findIndex((base) => factKey(base) === factKey(item));
    if (index === -1) return;
    const [base] = remaining.splice(index, 1);
    merged.push({ ...base, desc: typeof item.desc === "string" ? item.desc : base.desc });
  });
  return [...merged, ...remaining];
};

export const normalizeGeneratedCv = (generated, baseline, job) => {
  const source = generated && typeof generated === "object" ? generated : {};
  const keepArray = (key) =>
    Array.isArray(source[key]) ? source[key] : baseline[key] || [];
  const title = `${job.jobTitle} — ${job.business}`;

  return {
    name: source.name || title,
    navName: source.navName || title,
    summary: source.summary || baseline.summary || "",
    cats: {
      ...(baseline.cats || {}),
      ...(source.cats || {}),
      position: job.jobTitle,
      status: "draft",
    },
    image: baseline.image,
    persdetails: baseline.persdetails || {},
    workExp: mergeWorkExp(source.workExp, baseline.workExp),
    educ: baseline.educ || [],
    langSkills: keepArray("langSkills"),
    webdevSkills: keepArray("webdevSkills"),
    itSkills: keepArray("itSkills"),
    other: source.other || baseline.other || [],
  };
};

export default class CvGeminiApi extends GeminiApi {
  async adaptCv(baselineCv, job) {
    const model = this.setupModel();
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: buildCvPrompt(baselineCv, job) }] },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: Number(process.env.AI_CV_MAX_OUTPUT_TOKENS) || 8192,
        temperature: 0.2,
      },
    });
    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Gemini returned an empty CV");
    return normalizeGeneratedCv(extractJson(text), baselineCv, job);
  }
}
