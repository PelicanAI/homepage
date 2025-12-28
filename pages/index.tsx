import Head from 'next/head';
import { useEffect } from 'react';
import HelpChat from '../components/HelpChat';

export default function Home() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .feature-card').forEach(el => {
      observer.observe(el);
    });

    // Staggered animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pelican Trading | AI Market Intelligence for Traders</title>
        <meta name="description" content="The AI trading platform that thinks like you trade. Real-time market analysis, conversational backtesting, and institutional-grade intelligence—finally accessible to everyone." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
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
          background-image:
            linear-gradient(var(--grid-color) 1px, transparent 1px),
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

        .bracket-box {
          position: relative;
        }

        .bracket-box::before,
        .bracket-box::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--accent-purple);
          border-style: solid;
          opacity: 0.6;
        }

        .bracket-box::before {
          top: -1px;
          left: -1px;
          border-width: 2px 0 0 2px;
        }

        .bracket-box::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 2px 2px 0;
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

        .nav-links a:hover {
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

        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 8rem 2rem 4rem;
        }

        .hero-inner {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.8s ease forwards;
        }

        .hero-tag {
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

        .hero-tag::before {
          content: '//';
          color: var(--text-muted);
        }

        .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }

        .hero h1 .highlight {
          color: var(--accent-purple);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 500px;
          margin-bottom: 2.5rem;
          line-height: 1.7;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-visual {
          position: relative;
          opacity: 0;
          transform: translateX(30px);
          animation: fadeLeft 0.8s ease 0.3s forwards;
        }

        .hero-logo-large {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          display: block;
          filter: drop-shadow(0 0 60px rgba(168, 85, 247, 0.3));
        }

        .stats-bar {
          display: flex;
          gap: 3rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          opacity: 0;
          animation: fadeUp 0.8s ease 0.5s forwards;
        }

        .stat {
          text-align: left;
        }

        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--accent-purple);
          line-height: 1;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 0.25rem;
        }

        section {
          position: relative;
          z-index: 1;
          padding: 6rem 2rem;
        }

        .section-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          letter-spacing: 0.02em;
        }

        .what-section {
          background: linear-gradient(to bottom, transparent 0%, var(--bg-secondary) 50%, transparent 100%);
        }

        .what-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .what-text h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 1.5rem;
        }

        .what-text p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .what-platform {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
        }

        .platform-header {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .platform-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .platform-dot.red { background: #ef4444; }
        .platform-dot.yellow { background: #eab308; }
        .platform-dot.green { background: #22c55e; }

        .platform-line {
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: typeIn 0.3s ease forwards;
        }

        .platform-line:nth-child(2) { animation-delay: 0.1s; }
        .platform-line:nth-child(3) { animation-delay: 0.2s; }
        .platform-line:nth-child(4) { animation-delay: 0.3s; }
        .platform-line:nth-child(5) { animation-delay: 0.4s; }
        .platform-line:nth-child(6) { animation-delay: 0.5s; }

        .platform-prompt { color: var(--accent-cyan); }
        .platform-command { color: var(--text-primary); }
        .platform-output { color: var(--text-muted); }
        .platform-success { color: #22c55e; }
        .platform-value { color: var(--accent-purple); }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .feature-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 2rem;
          transition: all 0.3s;
          opacity: 0;
          transform: translateY(20px);
        }

        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-purple-dim);
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .feature-card h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .feature-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .team-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
        }

        .team-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .team-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .team-bio {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .pricing-section {
          background: linear-gradient(to bottom, transparent 0%, var(--bg-secondary) 50%, transparent 100%);
        }

        .pricing-card {
          max-width: 500px;
          margin: 0 auto;
          background: var(--bg-primary);
          border: 2px solid var(--accent-purple);
          padding: 3rem;
          text-align: center;
          position: relative;
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-purple);
          color: var(--bg-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.5rem 1rem;
        }

        .pricing-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          line-height: 1;
          margin: 1rem 0;
        }

        .pricing-amount span {
          font-size: 2rem;
          color: var(--text-muted);
        }

        .pricing-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .pricing-features {
          text-align: left;
          margin-bottom: 2rem;
        }

        .pricing-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .pricing-feature:last-child {
          border-bottom: none;
        }

        .pricing-check {
          color: var(--accent-cyan);
          font-weight: bold;
        }

        .every-trader-section {
          background: linear-gradient(to bottom, transparent 0%, var(--bg-secondary) 50%, transparent 100%);
        }

        .trader-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        .trader-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 2rem;
          border-radius: 0;
        }

        .trader-card-title {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--accent-purple);
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .trader-question {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-accent);
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .trader-response {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
        }

        .trader-response p {
          margin-bottom: 1rem;
        }

        .trader-response p:last-child {
          margin-bottom: 0;
        }

        .trader-response .response-item {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }

        .trader-response .summary-title {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .languages-section {
          padding: 6rem 2rem;
        }

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .language-tag {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 1rem 1.5rem;
          text-align: center;
          font-size: 0.95rem;
          color: var(--text-primary);
          transition: all 0.2s;
        }

        .language-tag:hover {
          border-color: var(--border-accent);
          background: var(--bg-tertiary);
        }

        @media (max-width: 1024px) {
          .trader-comparison {
            grid-template-columns: 1fr;
          }

          .languages-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .languages-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .cta-section {
          text-align: center;
          padding: 8rem 2rem;
        }

        .cta-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 1.5rem;
        }

        .cta-section p {
          color: var(--text-secondary);
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        footer {
          position: relative;
          z-index: 1;
          padding: 3rem 2rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-logo img {
          height: 32px;
        }

        .footer-logo span {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.1em;
        }

        .footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes typeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .cursor-blink {
          animation: pulse 1s infinite;
        }

        @media (max-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-cta {
            justify-content: center;
          }

          .hero-visual {
            order: -1;
          }

          .hero-logo-large {
            max-width: 300px;
          }

          .stats-bar {
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .what-content {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          nav {
            padding: 1rem;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 6rem 1rem 3rem;
          }

          .stats-bar {
            flex-wrap: wrap;
            gap: 2rem;
          }

          section {
            padding: 4rem 1rem;
          }

          .pricing-card {
            padding: 2rem 1.5rem;
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="grid-bg"></div>

      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <img src="/logo.png" alt="Pelican" />
            <span>Pelican</span>
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#team">Team</a>
            <a href="#pricing">Pricing</a>
            <a href="https://pelicantrading.org" className="btn-primary">Launch App →</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">Now in Beta</div>
            <h1>
              THE AI PLATFORM<br />
              THAT <span className="highlight">THINKS</span><br />
              LIKE YOU TRADE
            </h1>
            <p className="hero-subtitle">
              Institutional-grade market intelligence through natural conversation.
              Backtest strategies, analyze patterns, and execute with precision—all in one interface.
            </p>
            <div className="hero-cta">
              <a href="https://pelicantrading.org" className="btn-primary">Start Trading →</a>
              <a href="#features" className="btn-secondary">See Features</a>
            </div>
            <div className="stats-bar">
              <div className="stat">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Tickers Covered</div>
              </div>
              <div className="stat">
                <div className="stat-value">Plain English</div>
                <div className="stat-label">No Code Required</div>
              </div>
              <div className="stat">
                <div className="stat-value">1-Click</div>
                <div className="stat-label">Shareable Reports</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/logo.png" alt="Pelican Logo" className="hero-logo-large" />
          </div>
        </div>
      </section>

      <section className="what-section">
        <div className="section-inner">
          <div className="what-content">
            <div className="what-text animate-on-scroll">
              <h2>CURSOR IS FOR DEVELOPERS.<br />PELICAN IS FOR TRADERS.</h2>
              <p>
                Stop juggling between TradingView, spreadsheets, and ChatGPT. Pelican is the unified
                AI platform that understands markets the way you do—through conversation.
              </p>
              <p>
                Ask complex questions. Get structured answers with real data. Share branded analysis
                with one click. This is how trading intelligence should work.
              </p>
            </div>
            <div className="what-platform bracket-box animate-on-scroll">
              <div className="platform-header">
                <div className="platform-dot red"></div>
                <div className="platform-dot yellow"></div>
                <div className="platform-dot green"></div>
              </div>
              <div className="platform-line">
                <span className="platform-prompt">you:</span>{' '}
                <span className="platform-command">backtest momentum strategy on SPY, last 6 months</span>
              </div>
              <div className="platform-line">
                <span className="platform-output">analyzing 126 trading sessions...</span>
              </div>
              <div className="platform-line">
                <span className="platform-success">✓</span>{' '}
                <span className="platform-output">Win rate:</span>{' '}
                <span className="platform-value">67.4%</span>
              </div>
              <div className="platform-line">
                <span className="platform-success">✓</span>{' '}
                <span className="platform-output">Sharpe ratio:</span>{' '}
                <span className="platform-value">1.84</span>
              </div>
              <div className="platform-line">
                <span className="platform-success">✓</span>{' '}
                <span className="platform-output">Max drawdown:</span>{' '}
                <span className="platform-value">-8.2%</span>
              </div>
              <div className="platform-line">
                <span className="platform-prompt">pelican:</span>{' '}
                <span className="platform-command">generating shareable report...<span className="cursor-blink">_</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="section-inner">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">// What You Get</div>
            <h2 className="section-title">TRADING INTELLIGENCE, NOT ANOTHER TOOL TO LEARN</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card bracket-box">
              <div className="feature-icon">💬</div>
              <h3>JUST ASK</h3>
              <p>Type questions like you&apos;d ask a trading buddy. &quot;What&apos;s moving in semis today?&quot; &quot;Show me SPY&apos;s worst drawdowns.&quot; No syntax, no learning curve.</p>
            </div>
            <div className="feature-card bracket-box">
              <div className="feature-icon">🧪</div>
              <h3>TEST IDEAS IN SECONDS</h3>
              <p>Describe any strategy in plain English and see if it actually works. Win rates, drawdowns, Sharpe ratios—without writing a single line of code.</p>
            </div>
            <div className="feature-card bracket-box">
              <div className="feature-icon">🧠</div>
              <h3>KNOWS YOUR STYLE</h3>
              <p>Pelican remembers your positions, your watchlist, and how you like to trade. Every conversation picks up where you left off.</p>
            </div>
            <div className="feature-card bracket-box">
              <div className="feature-icon">🔍</div>
              <h3>FINDS WHAT YOU&apos;D MISS</h3>
              <p>Surface unusual volume, divergences, and setups across thousands of tickers. Let AI do the scanning while you focus on decisions.</p>
            </div>
            <div className="feature-card bracket-box">
              <div className="feature-icon">📤</div>
              <h3>SHARE & LOOK PRO</h3>
              <p>Generate branded tables and analysis ready for Twitter, Discord, or clients. One click from insight to shareable content.</p>
            </div>
            <div className="feature-card bracket-box">
              <div className="feature-icon">🚫</div>
              <h3>KILL THE TAB CHAOS</h3>
              <p>Stop bouncing between TradingView, spreadsheets, and ChatGPT. One interface for research, analysis, and idea generation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="every-trader-section">
        <div className="section-inner">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">// For Everyone</div>
            <h2 className="section-title">PELICAN FOR EVERY TRADER</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.1rem' }}>Whether you&apos;re just starting or managing millions, Pelican speaks your language</p>
          </div>
          <div className="trader-comparison">
            <div className="trader-card bracket-box animate-on-scroll">
              <div className="trader-card-title">New to Trading</div>
              <div className="trader-question">Is this TSLA dip worth buying?</div>
              <div className="trader-response">
                <p>Maybe—but only if buyers keep defending today&apos;s levels. As of 12:04 ET, TSLA is $425.21 (+2.8%) after bouncing from a low of $419.70, so dips are getting bought intraday.</p>
                <p>Simple plans for a new trader:</p>
                <div className="response-item">- Aggressive buy-the-dip: look for a pullback that holds 420–422, enter on a turn back up, risk a stop just below 419 (today&apos;s low). First target 429–430 (today&apos;s high), then 435 if momentum continues.</div>
                <div className="response-item">- Conservative: wait for a clean push and hold above 430, then buy a pullback toward 428–430, risk to ~423–425, target 435–440.</div>
                <p style={{ marginTop: '1rem' }}>If 419 breaks with volume and it can&apos;t reclaim quickly, skip it and wait for a better setup. Keep size small—TSLA moves fast—define your risk before you click.</p>
              </div>
            </div>
            <div className="trader-card bracket-box animate-on-scroll">
              <div className="trader-card-title">Experienced Trader</div>
              <div className="trader-question">The QQQ&apos;s closed down over -3% today. Using QQQ data for 2025, find every instance the QQQ&apos;s closed down -3% in a single day, and give me the 2 week return of the QQQ&apos;s following that event.</div>
              <div className="trader-response">
                <p>QQQ closed down at least -3% and the 2-week (10 trading days) return that followed:</p>
                <div className="response-item">- 2025-03-07: -3.88% day, next 2 weeks: -2.2%</div>
                <div className="response-item">- 2025-04-02: -5.35% day, next 2 weeks: -6.71%</div>
                <div className="response-item">- 2025-04-03: -6.21% day, next 2 weeks: -1.46%</div>
                <div className="response-item">- 2025-04-09: -4.25% day, next 2 weeks: +0.29%</div>
                <div className="response-item">- 2025-04-15: -3.02% day, next 2 weeks: +3.82%</div>
                <p className="summary-title">Summary (2-week/10-trading-day follow-through):</p>
                <div className="response-item">- Count: 5</div>
                <div className="response-item">- Average: -1.26%</div>
                <div className="response-item">- Median: -1.46%</div>
                <div className="response-item">- Best: +3.82%</div>
                <div className="response-item">- Worst: -6.71%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="section-inner">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">// The Team</div>
            <h2 className="section-title">BUILT BY TRADERS, FOR TRADERS</h2>
          </div>
          <div className="team-grid">
            <div className="team-card bracket-box animate-on-scroll">
              <div className="team-name">NICK GROVES</div>
              <div className="team-role">Founder & CEO</div>
              <p className="team-bio">
                Eight years across futures, FX, and digital assets. Former crypto arbitrage systems architect turned
                systems-driven strategist. Founded Pelican to challenge the industry&apos;s dependence on opaque tools
                and build an AI that thinks the way real traders operate—structured, contextual, and brutally honest.
              </p>
            </div>
            <div className="team-card bracket-box animate-on-scroll">
              <div className="team-name">RAYMOND CAMPBELL</div>
              <div className="team-role">Senior Architect</div>
              <p className="team-bio">
                Two decades building mission-critical financial infrastructure. Led NYSE&apos;s transition to electronic
                trading at Labranche, architecting ultra-low latency systems across 800+ symbols. Deep expertise
                in C++ high-performance systems, exchange connectivity, and modern crypto infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="languages-section">
        <div className="section-inner">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">// Global</div>
            <h2 className="section-title">AVAILABLE IN 30+ LANGUAGES</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.1rem' }}>Pelican speaks your language, wherever you trade</p>
          </div>
          <div className="languages-grid animate-on-scroll">
            <div className="language-tag">Chinese</div>
            <div className="language-tag">Spanish</div>
            <div className="language-tag">Japanese</div>
            <div className="language-tag">Korean</div>
            <div className="language-tag">French</div>
            <div className="language-tag">German</div>
            <div className="language-tag">Portuguese</div>
            <div className="language-tag">Italian</div>
            <div className="language-tag">Dutch</div>
            <div className="language-tag">Russian</div>
            <div className="language-tag">Turkish</div>
            <div className="language-tag">Arabic</div>
            <div className="language-tag">Polish</div>
            <div className="language-tag">Czech</div>
            <div className="language-tag">Slovak</div>
            <div className="language-tag">Hungarian</div>
            <div className="language-tag">Romanian</div>
            <div className="language-tag">Greek</div>
            <div className="language-tag">Swedish</div>
            <div className="language-tag">Danish</div>
            <div className="language-tag">Norwegian</div>
            <div className="language-tag">Finnish</div>
            <div className="language-tag">Ukrainian</div>
            <div className="language-tag">Hebrew</div>
            <div className="language-tag">Indonesian</div>
            <div className="language-tag">Malay</div>
            <div className="language-tag">Vietnamese</div>
            <div className="language-tag">Thai</div>
            <div className="language-tag">Filipino/Tagalog</div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="section-inner">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">// Pricing</div>
            <h2 className="section-title">ONE PLAN. EVERYTHING INCLUDED.</h2>
          </div>
          <div className="pricing-card bracket-box animate-on-scroll">
            <div className="pricing-badge">Pro Trader</div>
            <div className="pricing-amount">$50<span>/mo</span></div>
            <div className="pricing-period">Cancel anytime. No contracts.</div>
            <div className="pricing-features">
              <div className="pricing-feature">
                <span className="pricing-check">✓</span>
                Unlimited questions & conversations
              </div>
              <div className="pricing-feature">
                <span className="pricing-check">✓</span>
                Live data on 10,000+ tickers
              </div>
              <div className="pricing-feature">
                <span className="pricing-check">✓</span>
                Plain-English backtesting
              </div>
              <div className="pricing-feature">
                <span className="pricing-check">✓</span>
                Remembers your trading context
              </div>
              <div className="pricing-feature">
                <span className="pricing-check">✓</span>
                One-click shareable reports
              </div>
              <div className="pricing-feature">
                <span className="pricing-check">✓</span>
                New features as we ship them
              </div>
            </div>
            <a href="https://pelicantrading.org" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Get Started →
            </a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-inner animate-on-scroll">
          <h2>STOP SEARCHING.<br />START <span style={{ color: 'var(--accent-purple)' }}>ASKING.</span></h2>
          <p>Join traders who&apos;ve upgraded from scattered tools to unified intelligence.</p>
          <a href="https://pelicantrading.org" className="btn-primary">Launch Pelican →</a>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <img src="/logo.png" alt="Pelican" />
            <span>Pelican Trading</span>
          </div>
          <div className="footer-copy">
            © 2025 Pelican Trading. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Help Chat Widget */}
      <HelpChat logoUrl="/logo.png" />
    </>
  );
}

