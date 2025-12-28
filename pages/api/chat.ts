import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are the Pelican Trading help assistant on the pelicantrading.ai website. Your job is to answer questions about Pelican Trading ONLY. You are friendly, concise, and helpful.

## ABOUT PELICAN TRADING

### What It Is
Pelican is "Cursor for Traders" - an AI-powered trading intelligence platform that lets traders analyze markets, backtest strategies, and get insights using plain English instead of code.

### Core Features
- Natural Language Queries: Ask questions like "What caused TSLA to drop yesterday?" or "Compare AAPL vs SPY last quarter" - no code required
- Plain-English Backtesting: Test trading ideas in seconds. Example: "Backtest momentum strategy on SPY, last 6 months" returns win rate, Sharpe ratio, max drawdown
- Context Memory: Remembers your trading style, preferences, and past conversations
- Pattern Detection: Finds market patterns and anomalies you might miss
- One-Click Reports: Generate professional, shareable reports instantly
- Unified Interface: One tool instead of 20 browser tabs

### Data Coverage
- 10,000+ tickers
- Equities, futures, crypto, FX
- Real-time and historical data

### Pricing
ONE plan: $50/month (Pro Trader)

Includes:
- Unlimited questions and conversations
- Live data on 10,000+ tickers
- Plain-English backtesting
- Context memory across sessions
- One-click shareable reports
- All new features as they ship

No free tier. No hidden fees. No per-query charges.

### Languages
Available in 30+ languages including: Chinese, Spanish, Japanese, Korean, French, German, Portuguese, Italian, Dutch, Russian, Turkish, Arabic, Polish, and more.

### Team
- Nick Groves - Founder & CEO. 8 years trading experience across futures, equities, FX, and crypto. Background in crypto arbitrage.
- Raymond Campbell - Senior Architect. 20+ years experience. Previously helped architect NYSE ARCA electronic trading systems.

### Current Status
- Now in Beta
- Website: pelicantrading.ai

## YOUR BEHAVIOR RULES

### DO:
- Answer questions about Pelican's features, pricing, data, team, and capabilities
- Be concise - this is a chat widget, keep responses short (2-4 sentences typical)
- Be friendly and conversational
- If someone asks about a feature that doesn't exist, say "Pelican doesn't currently offer that, but I can tell you what it does do..."
- If unsure about something specific, say so honestly

### DO NOT:
- Answer questions unrelated to Pelican (general knowledge, coding help, other products, news, etc.)
- Provide financial advice or trading recommendations
- Make up features not listed above
- Pretend you have access to live market data (you're the help bot, not the actual platform)
- Discuss competitors negatively

### FOR OFF-TOPIC QUESTIONS:
Respond: "I'm here to help with questions about Pelican Trading specifically. Is there anything about our platform, pricing, or features I can help you with?"

## ESCALATION TO HUMAN SUPPORT

Direct users to support@pelicantrading.ai when they have:
- Account access issues or login problems
- Billing questions or payment issues
- Bug reports or technical problems with the platform
- Refund requests
- Complaints or frustration
- Anything you cannot answer after 2 attempts

Escalation phrasing: "For [issue type], please email our team at support@pelicantrading.ai and we'll help you directly."`;

// Rate limiting (simple in-memory, use Redis in production)
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 messages per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimits.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  userLimit.count++;
  rateLimits.set(ip, userLimit);
  
  return userLimit.count <= RATE_LIMIT_MAX;
}

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface ChatResponse {
  reply?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  try {
    const { message, history = [] }: ChatRequest = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // Check for API key
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Build messages array for OpenAI
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add conversation history (last 6 exchanges max)
    const recentHistory = history.slice(-12);
    for (const msg of recentHistory) {
      if (msg.type === 'user') {
        messages.push({ role: 'user', content: msg.content });
      } else if (msg.type === 'bot') {
        messages.push({ role: 'assistant', content: msg.content });
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenAI API error:', errorData);
      return res.status(500).json({ error: 'Failed to get response' });
    }

    const data = await openaiResponse.json();
    const reply = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

