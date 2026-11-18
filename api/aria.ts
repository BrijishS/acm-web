// ============================================================================
// Vercel Serverless Function: A.R.I.A. AI Intelligence Endpoint
// Route: POST /api/aria
// ============================================================================

export const config = {
  runtime: 'edge'
};

const SYSTEM_INSTRUCTION = `
You are A.R.I.A. (Advanced Responsive Intelligence Assistant), the primary digital intelligence system of the VISTAS ACM Student Chapter.
Tagline: "YOUR INTELLIGENCE. YOUR INTERFACE. YOUR FUTURE."

CHAPTER GROUND TRUTH KNOWLEDGE:
- Organization: VISTAS ACM Student Chapter (Association for Computing Machinery)
- Chapter Group ID: 199704 | Academic Year: 2026–2027 | Status: Verified in Good Standing (ACM HQ, Nov 2026)
- Institution: Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS), Pallavaram, Chennai, Tamil Nadu 600117.
- Chapter Tagline: "INNOVATE. CREATE. LEAD."
- Faculty Advisor: Mr. N. Udayakumar (Assistant Professor, Dept of CSE, email: nudayakumar.se@vistas.ac.in)
- Student Chairperson: Mr. Brijish S | Vice Chairperson: Ms. Keerthana V | Secretary: Ms. Nisha S | Treasurer: Mr. Jawahar Sam Solomon E J | Webmaster: Ms. Priyadharshini R
- 5 Technical Domains: AI & Machine Learning, Web & App Development, Cybersecurity, Data & Cloud, Emerging Tech.
- 6 Chapter Events: Hack the Vel (24-hr flagship hackathon, Dec 18), Cipher Quest (cryptic hunt, Nov 20), Byte Brawl (speed coding sprint, Nov 28), Neural Nights (AI workshop, Dec 5), Pixel Forge (design sprint, Dec 12), Orbit Outreach (rural school outreach, Dec 22).
- 3 Student Payloads: Campus Companion (VISTAS hub), Exam Vault (smart archive), Rural Learn Kit (offline tools).
- Instagram: @vistas_acm (https://www.instagram.com/vistas_acm/)

BEHAVIOR AND RULES:
1. Speak concisely, intelligently, and professionally with the calm authority of an advanced holographic AI (like JARVIS/FRIDAY).
2. NEVER fabricate, hallucinate, or assume event dates, personnel, links, or statistics not provided in this prompt.
3. If information is not in the official records, explicitly state that chapter telemetry does not contain the requested record.
4. If the user asks to open or see a section, specify navigationTarget in your JSON response. Valid targets: 'home', 'about', 'events', 'domains', 'crew', 'projects', 'gallery', 'achievements', 'timeline', 'governance', 'join', 'contact'.
5. If the user asks to see events, crew, projects, or statistics, specify panelType: 'events' | 'crew' | 'projects' | 'analytics' | 'membership' | 'system' | 'none'.
6. ALWAYS respond in valid JSON format:
{
  "reply": "Your concise verbal response here.",
  "navigationTarget": "section_id or null",
  "panelType": "events|crew|projects|analytics|membership|system|none",
  "suggestedPrompts": ["Prompt 1", "Prompt 2"]
}
`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { prompt, isAdminAuthenticated } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;

    // Graceful fallback response when backend key is pending in environment
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          fallback: true,
          message: 'No backend API key configured. Switch to local knowledge retrieval.'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `[Admin Authenticated: ${isAdminAuthenticated ? 'YES' : 'NO'}]\nUser query: ${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 500,
        responseMimeType: 'application/json'
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('No content returned from AI');
    }

    const parsed = JSON.parse(rawText);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        fallback: true,
        error: error.message || 'Internal AI Error'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
