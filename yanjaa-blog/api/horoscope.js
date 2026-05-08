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
      max_tokens: 120,
      system: 'You write single, original horoscope quotes. Each quote is one sentence — poetic, grounded, and specific to the sign. No clichés. No hashtags. No preamble. Return only the quote, nothing else.',
      messages: [{ role: 'user', content: `Write a horoscope quote for ${sign} for ${today}.` }],
    }),
  });

  const data = await response.json();
  if (!response.ok) return res.status(500).json({ error: data });
  const quote = data.content?.[0]?.text?.trim();
  if (!quote) return res.status(500).json({ error: 'No quote returned', data });

  res.status(200).json({ quote });
}
