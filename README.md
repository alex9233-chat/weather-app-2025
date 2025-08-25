[![Releases](https://img.shields.io/badge/Releases-Download%20and%20Run-blue?logo=github)](https://github.com/alex9233-chat/weather-app-2025/releases)

# Weather App 2025 — Modern Next.js Forecast, Themes & API UI

![Hero image](https://source.unsplash.com/1200x400/?weather,sky)

A modern, responsive weather app built with Next.js, React, Tailwind CSS and TypeScript. It fetches real-time weather data, detects user location, and shows forecasts with clean UI and theme support.

Badges
- [![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)](https://nextjs.org)
- [![React](https://img.shields.io/badge/React-18-cyan?logo=react)](https://reactjs.org)
- [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-sky?logo=tailwind-css)](https://tailwindcss.com)
- [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-lightblue?logo=typescript)](https://www.typescriptlang.org)
- [![shadcn-ui](https://img.shields.io/badge/shadcn--ui-components-purple)](https://ui.shadcn.com)
- [![Topics](https://img.shields.io/badge/topics-api%20%7C%20nextjs%20%7C%20weather--app-brightgreen)](https://github.com/alex9233-chat/weather-app-2025)

Quick links
- Releases: https://github.com/alex9233-chat/weather-app-2025/releases  
  Download the release asset from the linked Releases page and execute the installer or run the provided binary as described in the asset notes.

Table of contents
- Features
- Tech stack
- Demo and screenshots
- Installation
- Configuration
- Run and build
- API and data sources
- UI & components
- Theming
- Location detection
- Testing
- Deployment
- Contributing
- Releases
- License

Features
- Real-time current weather for any location.
- 7-day forecast with hourly details.
- Automatic location detection via browser geolocation and IP fallback.
- Multiple themes: light, dark, and accent palettes.
- Accessibility-friendly UI with keyboard support.
- Mobile-first responsive layout built with Tailwind CSS.
- Type-safe code base with TypeScript.
- Components powered by shadcn-ui and Radix primitives.
- Offline caching and basic service worker for fast loads.

Tech stack
- Next.js (app router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn-ui + Radix UI
- OpenWeatherMap or WeatherAPI (configurable)
- Vercel deployment (recommended)
- Jest + React Testing Library for unit tests

Demo and screenshots
![Current weather panel](https://source.unsplash.com/1200x600/?clouds)
- Use the demo images above to preview layout.
- Screenshots are not part of the repo; replace with your own app images in /public/screenshots for the project README.

Installation

Clone the repo
```bash
git clone https://github.com/alex9233-chat/weather-app-2025.git
cd weather-app-2025
```

Install dependencies (pnpm, npm or yarn)
```bash
pnpm install
# or
npm install
# or
yarn
```

Configuration

Copy the example environment file and set API keys
```bash
cp .env.example .env.local
```

Edit .env.local
```env
NEXT_PUBLIC_WEATHER_PROVIDER="openweathermap"      # or "weatherapi"
WEATHER_API_KEY="your_api_key_here"
NEXT_PUBLIC_DEFAULT_UNITS="metric"                  # metric or imperial
NEXT_PUBLIC_DEFAULT_LANG="en"
```

API providers
- OpenWeatherMap: set WEATHER_API_KEY to your OpenWeatherMap key.
- WeatherAPI: set WEATHER_API_KEY to your WeatherAPI key and update provider name in .env.

Run and build

Run dev server
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open http://localhost:3000

Build for production
```bash
pnpm build
pnpm start
# or
npm run build
npm run start
```

Static export (optional)
```bash
pnpm build
pnpm export
```

Architecture and folder layout
- /app — Next.js app router, page routes
- /components — UI components (cards, charts, toggles)
- /lib — API clients, helpers, unit conversions
- /hooks — custom React hooks (useWeather, useGeolocation, useTheme)
- /styles — Tailwind config and global CSS
- /public — static assets and screenshots
- /tests — unit and integration tests

Key components (what to look for)
- WeatherCard — current conditions and icon set
- ForecastList — daily and hourly breakdowns
- LocationInput — search box with auto-complete
- ThemeToggle — toggle between light and dark
- MapView — optional map preview (Leaflet or Mapbox)
- ErrorBoundary — UI for API and network errors

Styling and design system
- Tailwind config includes tokens for spacing, color, and typography.
- shadcn-ui primitives provide accessible components.
- Icons use Heroicons and Weather Icons.
- Use design tokens in components via className utilities.

Theming
- System theme detects prefers-color-scheme.
- Theme toggle writes to localStorage and updates CSS variables.
- Themes include color accents and accessible contrast ratios.

Location detection
- Primary: browser geolocation (navigator.geolocation).
- Fallback: IP-based lookup via a small IP service (configurable).
- The app asks for permission and handles denial cases gracefully by falling back to manual search.

Caching and offline
- The app caches API responses in-memory and localStorage.
- Optional service worker (Workbox) provides offline basic display of last-known forecast.
- Cache invalidation uses timestamps and TTL set in config.

Data handling and conversions
- The lib layer centralizes requests, unit conversion, and time zone adjustments.
- Convert Kelvin to Celsius/Fahrenheit when needed.
- Normalize provider responses into a common shape for UI components.

Error handling
- Show friendly messages for network problems and API rate limits.
- Use an ErrorBoundary component to catch render errors.
- Provide a retry action and offline fallback.

Testing
- Unit tests use Jest and React Testing Library.
- Run tests
```bash
pnpm test
# or
npm test
```
- Add tests for hooks like useWeather and components like ForecastList.

Continuous integration
- Example GitHub Actions included: lint, test, build.
- Adjust workflows in .github/workflows for your CI needs.

Linting and formatting
- ESLint with recommended rules for TypeScript and React.
- Prettier config for consistent formatting.
- Husky and lint-staged hooks for pre-commit checks.

Deployment
- Deploy to Vercel for fast edge builds and serverless functions.
- Configure environment variables in the Vercel dashboard.
- For other platforms, use standard Next.js build and start steps.

Security and API keys
- Keep API keys out of commits. Use .env.local and platform secrets.
- Rate limit API calls and cache results to reduce key usage.

Accessibility
- Use semantic HTML and ARIA where needed.
- Keyboard navigation across major controls.
- High-contrast theme options.

Contributing
- Fork the repo and open a pull request.
- Follow the coding style: TypeScript, functional components, hooks.
- Add tests for new features.
- Run lint and tests before opening a PR.

Issues and feature requests
- Open GitHub issues for bugs and enhancements.
- Tag issues with the relevant labels: bug, enhancement, docs.

Releases

[![Releases](https://img.shields.io/badge/Release%20Assets-Download%20%26%20Run-green?logo=github)](https://github.com/alex9233-chat/weather-app-2025/releases)

Visit the Releases page above. Download the latest release asset (zip, tar, or binary) and execute the included installer or run the provided binary. Check the asset notes for run instructions and supported platforms.

If the link does not work, check the repository Releases section on GitHub.

Changelog
- Follow Conventional Commits for automated changelogs.
- See Releases page for packaged versions and release notes.

FAQ
- Which weather provider does the app use?
  - The app supports multiple providers. Set NEXT_PUBLIC_WEATHER_PROVIDER in .env.local.
- How to switch units?
  - Use the unit toggle in the UI or set NEXT_PUBLIC_DEFAULT_UNITS in env.
- Can I run this offline?
  - The app caches the last known data and offers basic offline display.

Credits and resources
- OpenWeatherMap: https://openweathermap.org
- WeatherAPI: https://www.weatherapi.com
- Tailwind CSS: https://tailwindcss.com
- shadcn-ui: https://ui.shadcn.com
- Heroicons: https://heroicons.com
- Unsplash (demo images): https://unsplash.com

License
- MIT License. See LICENSE file for details.

Contact
- Report bugs and requests via GitHub issues.
- For release downloads and packaged assets visit: https://github.com/alex9233-chat/weather-app-2025/releases

Screenshots
![Mobile view](https://source.unsplash.com/800x600/?rain)
![Dark theme](https://source.unsplash.com/800x600/?night,city)

Environment example (.env.example)
```env
NEXT_PUBLIC_WEATHER_PROVIDER=openweathermap
WEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_DEFAULT_UNITS=metric
NEXT_PUBLIC_DEFAULT_LANG=en
```

Commands reference
- Dev: pnpm dev
- Build: pnpm build
- Start: pnpm start
- Test: pnpm test
- Lint: pnpm lint
- Format: pnpm format

Thank you for checking this repository.