export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sign } = req.body;
  if (!sign) return res.status(400).json({ error: 'Missing sign' });

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      system: `You find real quotes from real authors, philosophers, poets, or public figures that match the themes of a given zodiac sign. 
Search the web for a fitting quote. Then respond with ONLY a JSON object in this exact format, nothing else:
{"quote": "the quote text here", "author": "Full Name"}`,
      messages: [{ role: 'user', content: `Find a real quote from a known author or figure that fits the themes of ${sign} for ${today}. Return only the JSON.` }],
    }),
  });

  const data = await response.json();
  if (!response.ok) return res.status(500).json({ error: data });

  const textBlock = data.content?.find(b => b.type === 'text');
  const raw = textBlock?.text?.trim();
  if (!raw) return res.status(500).json({ error: 'No response', data });

  try {
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.status(200).json({ quote: parsed.quote, author: parsed.author });
  } catch {
    res.status(500).json({ error: 'Parse failed', raw });
  }
}
