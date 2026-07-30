# AstroVed Numerology Report Application

A modern, highly interactive React application that generates personalized, multi-page Numerology Reports. Built with React 19, TypeScript, Tailwind CSS, and Framer Motion, it offers users an immersive and visually stunning journey through their core numerological numbers, life path mathematics, and destiny forecasts.

## 🚀 Key Features

*   **Interactive Multi-Page Experience**: A "virtual booklet" UI design where users can seamlessly flip through beautifully animated report pages.
*   **Dynamic Numerology Engine**: Real-time calculation and interpretation of core numerology metrics:
    *   Life Path Number
    *   Destiny / Expression Number
    *   Soul Urge / Heart's Desire Number
    *   Personality Number
    *   Challenge Numbers
*   **Rich Animations**: Powered by `framer-motion`, featuring stagger animations, scroll-reveals, smooth page transitions, and interactive UI micro-animations (e.g., hover effects, sliding sidebar active states).
*   **Aesthetic UI/UX**: Clean, light-themed premium design utilizing glassmorphism, soft drop-shadows, and elegant typography to present complex data in an easily digestible format.
*   **Dynamic Data Context**: Utilizes React Context API (`ReportContext`) to store and persist user input (name, birth details) and make calculation results instantly available across all report pages.

## 🛠️ Technology Stack

*   **Framework**: React 19 (via Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4, Vanilla CSS (for custom scrollbars and complex gradients)
*   **Animation**: `framer-motion` (motion/react), `@react-bits` dynamic components
*   **Routing**: React Router DOM v7
*   **Icons**: Lucide React
*   **UI Components**: Custom tailored implementations (inspired by shadcn/ui principles)

## 📂 Architecture & Directory Structure

The application follows a clean, component-centric architecture:

```
src/
├── components/          # Reusable UI components
│   ├── animations/      # Specialized background/overlay animations
│   ├── flow/            # User input and onboarding flow components
│   ├── layout/          # Structural elements (Sidebar, Report Frame, Layout Wrappers)
│   └── slides/          # The individual report pages (Welcome, CoreNumbers, etc.)
├── context/             # React Context definitions (ReportContext)
├── data/                # Static content strings, copy, and numerology calculation utilities
├── types.ts             # Global TypeScript interfaces and type definitions
├── App.tsx              # Main routing and provider setup
└── main.tsx             # React DOM rendering entry point
```

### Component Details
*   **`NumerologyReportLayout`**: The core structural component that handles the responsive sidebar, the "virtual booklet" container, progress tracking, and `<Outlet />` routing for the slides.
*   **`ReportContext`**: Manages the global state. Captures user details from the initial form and provides the calculated `reportData` to all nested slide components.
*   **`slides/*`**: Modular components (`Welcome.tsx`, `CoreNumbers.tsx`, etc.) that act as the pages of the report. They pull data from the Context and render it using customized `framer-motion` entrance animations.

## 🚦 Routing Setup

The application uses standard React Router DOM browser routing.

*   `/` - The initial landing/input form where the user enters their birth details.
*   `/report/*` - The parent route for the generated report, utilizing `NumerologyReportLayout`.
    *   `/report/welcome`
    *   `/report/core-numbers`
    *   `/report/life-path-math`
    *   `/report/life-path-detail`
    *   `/report/name-destiny-math`
    *   `/report/numerology-overview`
    *   `/report/lucky-traits`
    *   `/report/month-forecast`
    *   `/report/premium-deliverables`

## 💻 Local Development Setup

1.  **Install Dependencies**
    Ensure you are using Node.js (v18+ recommended) and run:
    ```bash
    npm install
    ```

2.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Build for Production**
    ```bash
    npm run build
    ```
    This generates a production-ready bundle in the `dist` directory.

## 🎨 Styling Guidelines
*   **Tailwind Primary**: Almost all styling is handled via Tailwind utility classes to ensure rapid development and consistent token usage.
*   **Custom Colors**: Specific brand colors (e.g., AstroVed Orange `var(--color-av-orange)`) are defined in standard CSS and mapped via arbitrary values in Tailwind (`text-[var(--color-av-orange)]`).
*   **Scrollbars**: Custom webkit scrollbar styles are applied in standard CSS (`index.css`) or via custom Tailwind arbitrary variants (`[&::-webkit-scrollbar]...`) for absolute visual consistency.
