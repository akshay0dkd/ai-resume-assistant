require("dotenv").config()

const Groq = require("groq-sdk")
const { z } = require("zod")
const puppeteer = require("puppeteer")

// ================= GROQ CLIENT =================
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

// Debug check
console.log("Groq Key Loaded:", !!process.env.GROQ_API_KEY)

// ================= ZOD SCHEMA =================
const interviewReportSchema = z.object({
    matchScore: z.number(),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("The technical question can be asked in the interview"),
            intention: z.string().describe("Describe The intention behind the technical question"),
            answer: z.string().describe("Describe The answer to the technical question that the candidate should ideally give like a strong realistic candidate giving a good answer would answer") 
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe("The behavioral question can be asked in the interview"),
            intention: z.string().describe("Describe The intention behind the behavioral question"),
            answer: z.string().describe("Describe The answer to the behavioral question that the candidate should ideally give like a strong realistic candidate giving a good answer would answer")
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe("The skill that the candidate lacks"),
            severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe("The day of the week (1-7)"),
            focus: z.string().describe("The area of focus for the day"),
            tasks: z.array(z.string().describe("A task to complete on the specified day"))
        })
    ),

    title: z.string().describe("The title of the interview report") 
})

// ================= INTERVIEW REPORT =================
async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

const prompt = `
You are an expert technical interviewer.

Generate an interview report for this candidate:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON in this format:
{
  "matchScore": 0,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": ["task"]
    }
  ],
  "title": ""
}
`

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        response_format: { type: "json_object" }
    })

    const content = response.choices[0].message.content

    console.log("AI Response:", content)

    try {
     const parsed = JSON.parse(content.trim())
     return interviewReportSchema.parse(parsed)
    } catch (err) {
        console.error("JSON Parse Error:", err)
        throw err
    }
}

// ================= PDF GENERATION =================
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })

    const page = await browser.newPage()

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    })

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

// ================= RESUME GENERATION =================
async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

const prompt = `
You are a professional resume writer.

Create an ATS-friendly resume in HTML format.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON:
{
  "html": "<html>...</html>"
}
`

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        response_format: { type: "json_object" }
    })

    const content = response.choices[0].message.content

    console.log("Resume AI Response:", content)

    try {
      const jsonContent = JSON.parse(content.trim())
      if (!jsonContent.html) {
      throw new Error("Groq did not return valid HTML for resume generation")     }
      return await generatePdfFromHtml(jsonContent.html)
    } catch (err) {
        console.error("Resume JSON Error:", content)
        throw err
    }
}

// ================= EXPORT =================
module.exports = {
    generateInterviewReport,
    generateResumePdf
}