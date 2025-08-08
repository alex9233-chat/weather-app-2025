# 🌤️ Weather App

A modern, responsive weather application built with **Next.js**, **React**, and **Tailwind CSS**.
Get real-time weather data with automatic location detection, beautiful themes, and an intuitive user interface.

![Weather App Screenshot](https://via.placeholder.com/800x400/1E1E1E/FFFFFF?text=Weather+App+Screenshot)

---

## ✨ Features

### 🌍 **Smart Location Detection**

* **GPS Location**: Automatically detects your precise location
* **IP Geolocation**: Fallback to approximate location via IP address
* **Manual Search**: Search for any city worldwide
* **Location History**: Saves your preferred locations

### 🎨 **Beautiful Design**

* **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
* **Dark/Light Themes**: Persistent theme switching
* **Custom Backgrounds**: Gradient overlays & image backgrounds
* **Smooth Animations**: Polished transitions and hover effects

### 📊 **Comprehensive Weather Data**

* **Current Conditions**: Temperature, humidity, wind speed, "feels like"
* **3-Day Forecast**: Daily high/low with weather icons
* **Dynamic Weather Icons**
* **Real-time Updates** from OpenWeatherMap API

### 🛡️ **Robust Error Handling**

* Clear, actionable error messages
* Popular city suggestions when search fails
* Offline mode with graceful degradation
* Fallback sample data when API fails

---

## 🚀 Quick Start

### Prerequisites

* Node.js 18+
* npm, yarn, or pnpm
* OpenWeatherMap API key (get one [here](https://openweathermap.org/api))

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Configure environment variables
cp .env.example .env.local
# Add your key:
# NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here

# 4. Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```bash
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Getting Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Find your API key in **My API Keys**
4. Add it to `.env.local`:

   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_key_here
   ```

> It may take a few minutes for a new key to become active.

---

## 📱 Usage

### Automatic Location

* On first visit, grant location permission for the most accurate weather
* Falls back to IP-based location if denied

### Manual Search

* Click **Change Location** to search for any city
* Format: `"City"` or `"City, Country"` for best results

### Theme Switching

* Click the ☀️ / 🌙 icon
* Theme preference is saved automatically

---

## 🐇️ Project Structure

```
weather-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.jsx
├── components/
│   ├── ui/
│   ├── CurrentWeatherSection.jsx
│   ├── WeatherDetailsSection.jsx
│   ├── ForecastCard.jsx
│   ├── LocationModal.jsx
│   ├── ThemeSwitcher.jsx
│   ├── LoadingScreen.jsx
│   ├── ErrorBanner.jsx
│   └── weather-api.js
├── contexts/
│   └── ThemeContext.jsx
├── hooks/
│   └── useWeatherData.js
├── public/
│   └── images/
├── .env.example
└── README.md
```

---

## 🛠️ Built With

* **[Next.js 15](https://nextjs.org/)**
* **[React 18](https://reactjs.org/)**
* **[Tailwind CSS](https://tailwindcss.com/)**
* **[TypeScript](https://www.typescriptlang.org/)**

**UI Components**: [Shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/), [Radix UI](https://www.radix-ui.com/)
**APIs**: [OpenWeatherMap](https://openweathermap.org/api), [IP Geolocation API](https://ipapi.co/), [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

## 🌐 API Reference

```
// Current weather by city
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

// Current weather by coordinates
GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric

// 5-day forecast
GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
```

Example response:

```json
{
  "location": "New York, US",
  "temperature": 22,
  "condition": "sunny",
  "humidity": 65,
  "windSpeed": 12,
  "feelsLike": 24
}
```

---

## 🎨 Customization

**Themes** – Update `contexts/ThemeContext.jsx`:

```javascript
const themes = {
  dark: {
    background: '#1E1E1E',
    text: { primary: '#FFFFFF' }
  }
}
```

**Background Images** – Replace files in `/public/images/`.
**Icons** – Update `components/WeatherIcon.jsx`.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add env variables in Vercel settings
4. Deploy

**Manual:**

```bash
npm run build
npm start
```

---

## 🧪 Testing

```bash
# Dev
npm run dev

# Production build
npm run build
npm start

# Type check
npm run type-check
```

---

## 🤝 Contributing

1. Fork repo
2. Create branch: `git checkout -b feature/awesome`
3. Commit: `git commit -m "Add awesome feature"`
4. Push: `git push origin feature/awesome`
5. Open PR

---

## 📝 License

MIT License – see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

* [OpenWeatherMap](https://openweathermap.org/)
* [Shadcn/ui](https://ui.shadcn.com/)
* [Vercel](https://vercel.com/)
* [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ and ☀️ by \[Muhammad Hisham]**
⭐ Star this repo if you like it!
