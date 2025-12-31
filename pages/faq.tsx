import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import HelpChat from '../components/HelpChat';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'About Pelican',
    icon: '🦅',
    items: [
      {
        question: 'What is Pelican Trading?',
        answer: 'Pelican is "Cursor for Traders" - an AI-powered trading intelligence platform that lets traders analyze markets, backtest strategies, and get insights using plain English instead of code. Think of it as having an expert analyst available 24/7 who speaks your language.',
      },
      {
        question: 'Who is Pelican for?',
        answer: 'Pelican is designed for traders of all levels who want institutional-grade market intelligence without the complexity. Whether you\'re a day trader, swing trader, or long-term investor, Pelican helps you make more informed decisions faster.',
      },
      {
        question: 'What makes Pelican different from other trading tools?',
        answer: 'Unlike traditional platforms that require coding skills or complex interfaces, Pelican uses natural language. Just ask questions like "What caused TSLA to drop yesterday?" or "Compare AAPL vs SPY last quarter" and get instant, actionable insights. One tool instead of 20 browser tabs.',
      },
      {
        question: 'What is the current status of Pelican?',
        answer: 'Pelican is currently in Beta. You can sign up at pelicantrading.ai to get early access and help shape the future of the platform.',
      },
    ],
  },
  {
    title: 'Features',
    icon: '⚡',
    items: [
      {
        question: 'What are Natural Language Queries?',
        answer: 'Ask questions in plain English and get instant answers. Examples: "What caused TSLA to drop yesterday?", "Compare AAPL vs SPY last quarter", "Show me the best performing tech stocks this month". No code, no complex syntax—just ask.',
      },
      {
        question: 'How does Plain-English Backtesting work?',
        answer: 'Test trading ideas in seconds without writing a single line of code. Just describe your strategy: "Backtest momentum strategy on SPY, last 6 months" and Pelican returns comprehensive results including win rate, Sharpe ratio, max drawdown, and more.',
      },
      {
        question: 'What is Context Memory?',
        answer: 'Pelican remembers your trading style, preferences, and past conversations. This means responses get more personalized over time, and you don\'t have to repeat yourself. It\'s like having an assistant who truly knows how you trade.',
      },
      {
        question: 'How does Pattern Detection work?',
        answer: 'Pelican\'s AI continuously analyzes market data to find patterns and anomalies you might miss. It can identify trends, correlations, and unusual activity across thousands of tickers, giving you an edge in spotting opportunities.',
      },
      {
        question: 'What are One-Click Reports?',
        answer: 'Generate professional, shareable reports instantly. Whether you need to document your analysis, share insights with a team, or keep records of your research, Pelican creates polished reports with a single click.',
      },
    ],
  },
  {
    title: 'Data & Coverage',
    icon: '📊',
    items: [
      {
        question: 'How many tickers does Pelican cover?',
        answer: 'Pelican provides data on 10,000+ tickers, covering a comprehensive range of tradeable instruments.',
      },
      {
        question: 'What asset classes are supported?',
        answer: 'Pelican covers equities (stocks), futures, cryptocurrency, and foreign exchange (FX). Whether you trade stocks, crypto, or forex, we\'ve got you covered.',
      },
      {
        question: 'Is the data real-time or delayed?',
        answer: 'Pelican provides both real-time and historical data. All subscribers get live data on 10,000+ tickers for up-to-the-minute market intelligence.',
      },
    ],
  },
  {
    title: 'Pricing',
    icon: '💰',
    items: [
      {
        question: 'How does Pelican\'s pricing work?',
        answer: 'Pelican uses a credit-based pricing system. Credits represent analytical workload—simple queries cost fewer credits, complex analyses cost more. Credits reset monthly and do not roll over.',
      },
      {
        question: 'What are the subscription tiers?',
        answer: 'Three tiers: Starter ($29/month, 1,000 credits) for exploration and learning, Pro ($99/month, 3,500 credits) for active traders, and Power ($249/month, 10,000 credits) for heavy and professional users.',
      },
      {
        question: 'How many credits do queries cost?',
        answer: 'It depends on complexity: Conversation/Mentoring costs 2 credits, Simple Price Checks cost 10 credits, Basic Analysis (RSI, MACD, comparisons) costs 25 credits, Event Studies cost 75 credits, and Multi-Day Tick Analysis or backtests cost 200 credits.',
      },
      {
        question: 'What\'s included in all tiers?',
        answer: 'All tiers include: live data on 10,000+ tickers, plain-English backtesting, context memory across sessions, one-click shareable reports, and all new features as they ship. The only difference is credit allotment.',
      },
      {
        question: 'Is there a free tier or trial?',
        answer: 'There is no free tier. Pelican operates on a paid-from-day-one model. We believe in providing full value from day one rather than a limited experience.',
      },
      {
        question: 'What happens if a query fails?',
        answer: 'System failures automatically refund your credits. We prioritize trust and fairness—you only pay for successful analyses.',
      },
      {
        question: 'How does Pelican compare to Bloomberg or other terminals?',
        answer: 'Pelican is approximately 99% cheaper than institutional terminals. Bloomberg Terminal costs ~$24,000/year, Refinitiv Eikon ~$22,000/year, FactSet ~$12,000/year. Pelican ranges from $348–$2,988/year while delivering institutional-grade reasoning through natural language.',
      },
    ],
  },
  {
    title: 'Languages & Accessibility',
    icon: '🌍',
    items: [
      {
        question: 'What languages does Pelican support?',
        answer: 'Pelican is available in 30+ languages including Chinese, Spanish, Japanese, Korean, French, German, Portuguese, Italian, Dutch, Russian, Turkish, Arabic, Polish, and many more. Trade in your native language.',
      },
    ],
  },
  {
    title: 'Team & Company',
    icon: '👥',
    items: [
      {
        question: 'Who founded Pelican?',
        answer: 'Pelican was founded by Nick Groves, who serves as CEO. Nick brings 8 years of trading experience across futures, equities, FX, and crypto, with a background in crypto arbitrage.',
      },
      {
        question: 'Who else is on the team?',
        answer: 'Raymond Campbell is the Senior Architect with 20+ years of experience. Raymond previously helped architect the NYSE ARCA electronic trading systems, bringing institutional-grade engineering to Pelican.',
      },
    ],
  },
  {
    title: 'Support',
    icon: '🛟',
    items: [
      {
        question: 'How do I get help?',
        answer: 'You can use the chat widget on this site for quick questions about Pelican. For account issues, billing questions, bug reports, or anything else, email us at support@pelicantrading.ai.',
      },
      {
        question: 'What if I have a billing or account issue?',
        answer: 'For billing questions, payment issues, account access problems, or refund requests, please email support@pelicantrading.ai and our team will help you directly.',
      },
      {
        question: 'How do I report a bug?',
        answer: 'If you encounter a bug or technical issue with the platform, email support@pelicantrading.ai with details about what happened. Screenshots and steps to reproduce are always helpful!',
      },
    ],
  },
];

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="faq-item">
      <button className={`faq-question ${isOpen ? 'open' : ''}`} onClick={onToggle}>
        <span>{item.question}</span>
        <svg
          className={`faq-chevron ${isOpen ? 'open' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FAQ | Pelican Trading</title>
        <meta
          name="description"
          content="Frequently asked questions about Pelican Trading - AI-powered trading intelligence platform."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <style jsx global>{`
        :root {
          --bg-primary: #0a0b0f;
          --bg-secondary: #12141a;
          --bg-tertiary: #1a1d24;
          --accent-purple: #a855f7;
          --accent-purple-dim: rgba(168, 85, 247, 0.15);
          --accent-cyan: #22d3ee;
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --border-color: rgba(148, 163, 184, 0.1);
          --border-accent: rgba(168, 85, 247, 0.3);
          --grid-color: rgba(148, 163, 184, 0.03);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'IBM Plex Sans', sans-serif;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .grid-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .grid-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at 50% 0%, var(--accent-purple-dim) 0%, transparent 60%);
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem 2rem;
          background: linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .nav-logo img {
          height: 40px;
          width: auto;
        }

        .nav-logo span {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-links a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--accent-purple);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--accent-purple);
          color: var(--bg-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: #c084fc;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(168, 85, 247, 0.3);
        }

        .faq-page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .faq-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .faq-tag::before {
          content: '//';
          color: var(--text-muted);
        }

        .faq-header h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
        }

        .faq-header h1 .highlight {
          color: var(--accent-purple);
        }

        .faq-header p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-category {
          margin-bottom: 3rem;
        }

        .faq-category-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .faq-category-icon {
          font-size: 1.5rem;
        }

        .faq-category-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.75rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .faq-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          margin-bottom: 0.75rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .faq-item:hover {
          border-color: var(--border-accent);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s;
        }

        .faq-question:hover {
          background: var(--bg-tertiary);
        }

        .faq-question.open {
          background: var(--bg-tertiary);
        }

        .faq-chevron {
          flex-shrink: 0;
          color: var(--accent-purple);
          transition: transform 0.3s ease;
        }

        .faq-chevron.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .faq-answer.open {
          max-height: 500px;
          padding: 0 1.5rem 1.25rem;
        }

        .faq-answer p {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .faq-cta {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        .faq-cta h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.75rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .faq-cta p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .faq-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid var(--border-accent);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--accent-purple-dim);
          border-color: var(--accent-purple);
        }

        footer {
          position: relative;
          z-index: 1;
          padding: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        footer a {
          color: var(--accent-purple);
          text-decoration: none;
        }

        footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          nav {
            padding: 1rem;
          }

          .nav-links {
            display: none;
          }

          .faq-page {
            padding: 6rem 1rem 2rem;
          }

          .faq-question {
            padding: 1rem;
            font-size: 0.95rem;
          }

          .faq-answer.open {
            padding: 0 1rem 1rem;
          }

          .faq-cta {
            padding: 2rem 1.5rem;
          }

          .faq-cta-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="grid-bg"></div>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/logo.png" alt="Pelican" />
            <span>Pelican</span>
          </Link>
          <div className="nav-links">
            <Link href="/#features">Features</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/faq" className="active">FAQ</Link>
            <a href="https://app.pelicantrading.ai" className="btn-primary">
              Get Started →
            </a>
          </div>
        </div>
      </nav>

      <main className="faq-page">
        <div className="faq-container">
          <header className="faq-header">
            <div className="faq-tag">Help Center</div>
            <h1>
              Frequently Asked <span className="highlight">Questions</span>
            </h1>
            <p>
              Everything you need to know about Pelican Trading. Can't find what you're looking for? Use the
              chat widget or contact our support team.
            </p>
          </header>

          {faqData.map((category, catIndex) => (
            <section key={catIndex} className="faq-category">
              <div className="faq-category-header">
                <span className="faq-category-icon">{category.icon}</span>
                <h2 className="faq-category-title">{category.title}</h2>
              </div>
              {category.items.map((item, itemIndex) => {
                const key = `${catIndex}-${itemIndex}`;
                return (
                  <FAQAccordion
                    key={key}
                    item={item}
                    isOpen={openItems.has(key)}
                    onToggle={() => toggleItem(key)}
                  />
                );
              })}
            </section>
          ))}

          <div className="faq-cta">
            <h3>Still Have Questions?</h3>
            <p>Our team is here to help. Reach out anytime.</p>
            <div className="faq-cta-buttons">
              <a href="mailto:support@pelicantrading.ai" className="btn-secondary">
                Email Support
              </a>
              <a href="https://app.pelicantrading.ai" className="btn-primary">
                Try Pelican Free →
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>
          © 2024 Pelican Trading. <Link href="/">Back to Home</Link>
        </p>
      </footer>

      <HelpChat />
    </>
  );
}

