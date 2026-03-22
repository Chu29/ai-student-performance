# GitHub Copilot Instructions
# Student Performance Prediction Dashboard
# Design System: Vercel UI | Light & Dark Theme

---

## Project Overview

This is a Next.js 14 web dashboard for an AI-powered student academic performance
prediction system. The frontend communicates with a Python Flask backend via REST API.
The design language follows Vercel's UI system: clean, minimal, high-contrast,
developer-focused. Dark mode is first-class, not an afterthought.

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Theme: next-themes (light/dark toggle)
- Charts: Recharts
- Icons: lucide-react
- Font: Geist (next/font/google) with Inter as fallback
- Language: JavaScript (JSX)

---

## File Structure Convention

```
app/
  layout.js         ← root layout, ThemeProvider wraps everything here
  page.js           ← main dashboard page
  globals.css       ← CSS variables for both themes, base resets
components/
  Header.js         ← sticky header with logo + theme toggle
  PredictionForm.js ← student input form (left column)
  ResultCard.js     ← predicted grade + confidence (right column)
  ProbabilityChart.js ← recharts bar chart of grade probabilities
  RecommendationsList.js ← numbered list of improvement tips
  ThemeToggle.js    ← sun/moon icon button
  Skeleton.js       ← loading shimmer placeholders
```

---

## CSS Variables (globals.css)

Always use these CSS variables. Never hardcode colour values in components.

```css
:root {
  --background: #ffffff;
  --background-secondary: #fafafa;
  --background-tertiary: #f2f2f2;
  --border: #eaeaea;
  --border-hover: #999999;
  --text-primary: #000000;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --accent: #0070f3;
  --accent-hover: #0060df;
  --accent-light: #e8f0fe;
  --success: #00a37a;
  --warning: #f5a623;
  --error: #ee0000;
  --surface: #ffffff;
  --surface-raised: #fafafa;

  /* Grade colours */
  --grade-fail: #ee0000;
  --grade-pass: #f5a623;
  --grade-merit: #0070f3;
  --grade-distinction: #00a37a;
}

.dark {
  --background: #000000;
  --background-secondary: #111111;
  --background-tertiary: #1a1a1a;
  --border: #333333;
  --border-hover: #666666;
  --text-primary: #ffffff;
  --text-secondary: #888888;
  --text-tertiary: #555555;
  --accent: #0070f3;
  --accent-hover: #3291ff;
  --accent-light: #0a1628;
  --success: #50e3c2;
  --warning: #f7b955;
  --error: #ff4444;
  --surface: #111111;
  --surface-raised: #1a1a1a;

  /* Grade colours */
  --grade-fail: #ff4444;
  --grade-pass: #f7b955;
  --grade-merit: #3291ff;
  --grade-distinction: #50e3c2;
}
```

---

## Typography Rules

- Font family: Geist > Inter > system-ui
- Base size: 14px for all body text
- Labels above inputs: 11px, weight 500, uppercase, letter-spacing 0.05em, color var(--text-tertiary)
- Section headings inside cards: 12px, weight 600, uppercase, letter-spacing 0.05em
- Card titles: 14px, weight 600, color var(--text-primary)
- Scores and numbers: use monospace (font-variant-numeric: tabular-nums)
- Never exceed 32px font size in the dashboard UI

---

## Spacing System

Base unit is 8px. Use multiples: 4, 8, 12, 16, 20, 24, 32, 48.
- Page max-width: 1200px, centered with auto margins
- Page padding: 24px horizontal, 32px vertical
- Main grid: 2 columns on desktop (minmax(420px, 1fr) | 1fr), 1 column on mobile
- Column gap: 24px
- Card internal padding: 16px 20px
- Stack gap between cards in results column: 16px

---

## Component Specifications

### Layout (page.js)
- Two-column CSS grid: form on left, results on right
- Results column stacks: ResultCard → ProbabilityChart → RecommendationsList
- On mobile: single column, form first

### Header
- Height: 64px, sticky, top-0, z-50
- Background: var(--background) at 95% opacity + backdrop-blur-md
- Bottom border: 1px solid var(--border)
- Left side: small gradient square logo (16x16) + app name (14px weight 600)
- Right side: ThemeToggle button
- No navigation links needed

### Cards
- Background: var(--surface)
- Border: 1px solid var(--border)
- Border-radius: 8px
- Padding: 16px 20px
- No box-shadow in dark mode
- Light mode: box-shadow 0 1px 3px rgba(0,0,0,0.06)
- Hover: border-color transitions to var(--border-hover)
- Transition: border-color 150ms ease

### Input Fields
- Height: 36px
- Background: var(--background)
- Border: 1px solid var(--border)
- Border-radius: 6px
- Padding: 0 12px
- Font-size: 14px
- Focus: border-color var(--accent), box-shadow 0 0 0 3px rgba(0,112,243,0.15), outline none
- Error: border-color var(--error), box-shadow 0 0 0 3px rgba(238,0,0,0.12)
- Transition: border-color 150ms ease, box-shadow 150ms ease

### Range Sliders
- Track height: 2px, color var(--border)
- Fill: var(--accent)
- Thumb: 14px circle, background var(--accent), no border
- Thumb focus: box-shadow 0 0 0 3px rgba(0,112,243,0.2)

### Toggle Buttons (Yes / No)
- Default: background var(--background-secondary), border 1px solid var(--border), color var(--text-secondary)
- Active: background var(--accent), border-color var(--accent), color #ffffff
- Border-radius: 6px
- Height: 32px
- Font-size: 12px, weight 500
- Transition: all 150ms ease

### Primary Action Button (Predict Performance)
- Background: var(--text-primary)  ← black in light mode, white in dark mode
- Color: var(--background)
- Border-radius: 6px
- Height: 40px
- Full width
- Font-size: 14px, weight 500
- Letter-spacing: 0.01em
- No border
- Hover: opacity 0.85
- Active: transform scale(0.98)
- Disabled: opacity 0.4, cursor not-allowed
- Loading: inline spinner (20px, border-width 2px, same color as text)
- Transition: opacity 150ms ease, transform 100ms ease

### ResultCard
- Left border: 4px solid <grade-color> (use CSS variable per grade)
- Grade label: 20px, weight 700, color matches grade
- Confidence badge: pill shape, background var(--background-secondary),
  border 1px solid var(--border), 11px uppercase weight 500, color var(--text-secondary)
- Sub-text: 13px, color var(--text-secondary), line-height 1.6

### ProbabilityChart (Recharts)
- Bar fill: use grade CSS variables
- Bar border-radius: [4, 4, 0, 0]
- CartesianGrid: strokeDasharray="3 3", stroke var(--border)
- XAxis/YAxis tick: font-size 11px, fill var(--text-tertiary)
- YAxis unit: "%", domain [0, 100]
- Custom Tooltip:
    background var(--surface-raised),
    border 1px solid var(--border),
    border-radius 6px,
    font-size 12px,
    color var(--text-primary),
    box-shadow 0 4px 12px rgba(0,0,0,0.12)
- No legend
- ResponsiveContainer height: 200px

### RecommendationsList
- Each item: flex row, gap 12px, padding 12px 0
- Divider between items: border-bottom 1px solid var(--border), except last child
- Number badge: 20x20px, background var(--background-secondary),
  border 1px solid var(--border), border-radius 4px,
  font-size 11px weight 600, color var(--text-secondary), flex-shrink-0
- Item text: 13px, line-height 1.6, color var(--text-secondary)

### ThemeToggle
- 32x32px button
- Border: 1px solid var(--border)
- Border-radius: 6px
- Background: transparent
- Icon: Sun (light mode) / Moon (dark mode) from lucide-react, size 16
- Color: var(--text-secondary)
- Hover: border-color var(--border-hover), color var(--text-primary)
- Transition: all 150ms ease
- Use useTheme() from next-themes

### Skeleton (loading state)
- Shimmer animation: gradient sweeping left to right
  background: linear-gradient(90deg, var(--border) 25%, var(--background-tertiary) 50%, var(--border) 75%)
  background-size: 200% 100%
  animation: shimmer 1.5s infinite linear
- Border-radius: 4px
- Use to replace ResultCard, ProbabilityChart, RecommendationsList while loading

### Empty State (no prediction yet)
- Centered vertically and horizontally in results column
- Icon: GraduationCap from lucide-react, 40px, color var(--text-tertiary)
- Text: 13px, color var(--text-tertiary)
- No card border, no background — floating appearance

---

## Theme Setup (layout.js)

```jsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Install: `npm install next-themes`

The ThemeProvider sets a "dark" class on <html> which activates the .dark CSS variables.

---

## API Integration

Backend base URL: http://localhost:5000

POST /predict
Request body (JSON):
{
  age: number,           // 15–22
  studytime: number,     // 1–4
  failures: number,      // 0–3
  absences: number,      // 0–93
  freetime: number,      // 1–5
  goout: number,         // 1–5
  health: number,        // 1–5
  famrel: number,        // 1–5
  internet: number,      // 0 or 1
  higher: number,        // 0 or 1
  G1: number,            // 0–20
  G2: number             // 0–20
}

Response body (JSON):
{
  predicted_grade_class: 0 | 1 | 2 | 3,
  predicted_grade_label: string,   // e.g. "Merit (14 - 16)"
  confidence: number,              // e.g. 87.50
  probabilities: {                 // each key is a grade label, value is percentage
    "Fail (< 10)": number,
    "Pass (10 - 13)": number,
    "Merit (14 - 16)": number,
    "Distinction (17 - 20)": number
  },
  recommendations: string[]
}

GET /health → { status: "ok" }

Handle errors: show inline error message inside the results column,
styled with var(--error) colour and a subtle error background.

---

## Micro-interactions & Animation Rules

- All interactive elements: transition all 150ms ease
- Card hover: border-color transition only, no scale or shadow jump
- Input focus ring: appears instantly, no delay
- Result panel entry: opacity 0 → 1 over 200ms (CSS fade-in) when prediction arrives
- Button active: scale(0.98), releases on mouse-up
- Theme toggle: icon cross-fades, no layout shift

---

## Do's and Don'ts

DO:
- Use CSS variables exclusively for all colours
- Keep border-radius between 4px and 8px
- Use 1px borders with subtle colour for all surfaces
- Use the black/white button pattern (Vercel style) for the primary CTA
- Use monospace tabular numbers for all scores and percentages
- Let whitespace communicate hierarchy
- Use uppercase 11px labels above form fields

DON'T:
- Hardcode any hex colour values in components
- Use border-radius above 8px (except pill badges which use 100px)
- Add decorative gradients, illustrations, or background patterns
- Use blue as the primary button background colour
- Add drop shadows heavier than 0 1px 3px rgba(0,0,0,0.06)
- Use more than 4 accent colours in the UI simultaneously
- Add animations longer than 300ms
