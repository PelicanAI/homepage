# Pelican Trading Website Reference

## Overview
This is a single-page marketing website for Pelican Trading, an AI-powered trading intelligence platform. The site features a dark, modern design with a tech/trading aesthetic.

## Design System

### Color Palette
- **Background Primary**: `#0a0b0f` (very dark blue-black)
- **Background Secondary**: `#12141a` (slightly lighter dark)
- **Background Tertiary**: `#1a1d24` (medium dark)
- **Accent Purple**: `#a855f7` (primary brand color)
- **Accent Purple Dim**: `rgba(168, 85, 247, 0.15)` (subtle purple glow)
- **Accent Cyan**: `#22d3ee` (secondary accent)
- **Text Primary**: `#f1f5f9` (light gray-white)
- **Text Secondary**: `#94a3b8` (medium gray)
- **Text Muted**: `#64748b` (darker gray)
- **Border Color**: `rgba(148, 163, 184, 0.1)` (subtle borders)
- **Border Accent**: `rgba(168, 85, 247, 0.3)` (purple borders)

### Typography
- **Headings**: 'Bebas Neue' (display font, uppercase, bold)
- **Body**: 'IBM Plex Sans' (clean sans-serif)
- **Monospace/Code**: 'JetBrains Mono' (for technical elements, buttons, tags)

### Visual Elements
- **Grid Background**: Fixed grid pattern overlay (60px × 60px) with subtle purple radial gradient at top
- **Corner Brackets**: Decorative corner brackets on cards (purple accent borders)
- **Animations**: Fade-up, fade-left, type-in animations with scroll triggers

## Page Structure

### 1. Navigation Bar (Fixed Top)
- Logo (logo.png) + "Pelican" text
- Links: Features, Team, Pricing
- Primary CTA button: "Launch App →"
- Transparent background with blur effect

### 2. Hero Section
- **Left Side**: 
  - "Now in Beta" tag
  - Large headline: "THE AI PLATFORM THAT **THINKS** LIKE YOU TRADE"
  - Subtitle describing the platform
  - Two CTAs: "Start Trading →" (primary) and "See Features" (secondary)
  - Stats bar: "10K+ Tickers Covered", "Plain English No Code Required", "1-Click Shareable Reports"
- **Right Side**: 
  - Large logo image (logo.png) with purple glow effect

### 3. "What is Pelican" Section
- **Left**: Text explaining "CURSOR IS FOR DEVELOPERS. PELICAN IS FOR TRADERS."
- **Right**: Terminal-style code block showing example conversation:
  - Terminal window with red/yellow/green dots
  - Example: "backtest momentum strategy on SPY, last 6 months"
  - Shows results: Win rate 67.4%, Sharpe ratio 1.84, Max drawdown -8.2%

### 4. Features Section
- Header: "TRADING INTELLIGENCE, NOT ANOTHER TOOL TO LEARN"
- 6 feature cards in 3-column grid:
  1. **JUST ASK** 💬 - Natural language questions
  2. **TEST IDEAS IN SECONDS** 🧪 - Plain English backtesting
  3. **KNOWS YOUR STYLE** 🧠 - Remembers context
  4. **FINDS WHAT YOU'D MISS** 🔍 - Pattern detection
  5. **SHARE & LOOK PRO** 📤 - One-click reports
  6. **KILL THE TAB CHAOS** 🚫 - Unified interface
- Each card has corner brackets and hover effects

### 5. "Pelican for Every Trader" Section
- Two-column comparison:
  - **New to Trading**: Example Q&A about TSLA dip with beginner-friendly advice
  - **Experienced Trader**: Example Q&A about QQQ -3% days with data analysis
- Shows how Pelican adapts to different user levels

### 6. Team Section
- Header: "BUILT BY TRADERS, FOR TRADERS"
- Two team member cards:
  - **Nick Groves** - Founder & CEO (8 years trading, crypto arbitrage background)
  - **Raymond Campbell** - Senior Architect (20 years, NYSE electronic trading)
- Each card has gradient top border (purple to cyan)

### 7. Languages Section
- Header: "AVAILABLE IN 30+ LANGUAGES"
- Grid of language tags: Chinese, Spanish, Japanese, Korean, French, German, Portuguese, Italian, Dutch, Russian, Turkish, Arabic, Polish, Czech, Slovak, Hungarian, Romanian, Greek, Swedish, Danish, Norwegian, Finnish, Ukrainian, Hebrew, Indonesian, Malay, Vietnamese, Thai, Filipino/Tagalog

### 8. Pricing Section
- Header: "ONE PLAN. EVERYTHING INCLUDED."
- Single pricing card:
  - Badge: "Pro Trader"
  - Price: **$50/mo**
  - Features list with checkmarks:
    - Unlimited questions & conversations
    - Live data on 10,000+ tickers
    - Plain-English backtesting
    - Remembers your trading context
    - One-click shareable reports
    - New features as we ship them
  - CTA: "Get Started →"

### 9. Final CTA Section
- Large headline: "STOP SEARCHING. START **ASKING.**"
- Subtitle
- Primary CTA button

### 10. Footer
- Logo + "Pelican Trading" text
- Copyright: "© 2025 Pelican Trading. All rights reserved."

## Interactive Elements

### Buttons
- **Primary**: Purple background, dark text, uppercase, monospace font, hover lift effect
- **Secondary**: Transparent with purple border, hover fills with purple glow

### Animations
- Scroll-triggered fade-in animations
- Staggered feature card animations
- Smooth scroll for anchor links
- Terminal typing animation effect

## Responsive Design

### Desktop (>1024px)
- 2-column hero layout
- 3-column features grid
- 2-column trader comparison
- 4-column languages grid

### Tablet (640px - 1024px)
- Single column hero
- Single column features
- Single column trader comparison
- 3-column languages grid

### Mobile (<640px)
- Hidden navigation links
- Reduced padding
- 2-column languages grid
- Stacked layouts throughout

## Key Files
- `index.html` - Complete single-page HTML with embedded CSS and JavaScript
- `logo.png` - Pelican logo (used in navigation, hero, and footer)

## Technical Notes
- All styles are embedded in `<style>` tag (no external CSS)
- JavaScript is embedded at bottom of HTML
- Uses Intersection Observer API for scroll animations
- Google Fonts: Bebas Neue, IBM Plex Sans, JetBrains Mono
- No external dependencies beyond fonts
- Fully self-contained single HTML file

