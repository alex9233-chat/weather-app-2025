# 🌤️ Weather App

A modern, responsive weather application built with Next.js, React, and Tailwind CSS. Get real-time weather data with automatic location detection, beautiful themes, and an intuitive user interface.

![Weather App Screenshot](https://via.placeholder.com/800x400/1E1E1E/FFFFFF?text=Weather+App+Screenshot)

## ✨ Features

### 🌍 **Smart Location Detection**
- **GPS Location**: Automatic detection of user's precise location
- **IP Geolocation**: Fallback to approximate location using IP address
- **Manual Search**: Search for any city worldwide
- **Location History**: Remembers your preferred locations

### 🎨 **Beautiful Design**
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Themes**: Toggle between themes with persistence
- **Custom Backgrounds**: Beautiful gradient overlays and images
- **Smooth Animations**: Polished transitions and hover effects

### 📊 **Comprehensive Weather Data**
- **Current Conditions**: Temperature, humidity, wind speed, "feels like"
- **3-Day Forecast**: Daily high/low temperatures with weather icons
- **Weather Icons**: Dynamic icons based on current conditions
- **Real-time Updates**: Fresh data from OpenWeatherMap API

### 🛡️ **Robust Error Handling**
- **Smart Error Messages**: Clear, actionable feedback for users
- **City Suggestions**: Popular cities when search fails
- **Offline Detection**: Graceful handling of network issues
- **API Error Recovery**: Fallback to sample data when needed

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit \`.env.local\` and add your API key:
   \`\`\`env
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key
5. Add it to your \`.env.local\` file

**Note**: It may take a few minutes for your API key to become active.

## 📱 Usage

### **Automatic Location**
- The app will request your location permission on first visit
- Allow location access for the most accurate weather data
- If denied, it falls back to IP-based location detection

### **Manual Location Search**
- Click "Change Location" to search for any city
- Use format: "City Name" or "City, Country" for best results
- Try suggested popular cities if your search fails

### **Theme Switching**
- Click the sun/moon icon in the top-right corner
- Your theme preference is automatically saved
- Smooth transitions between light and dark modes

## 🏗️ Project Structure

\`\`\`
weather-app/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.jsx             # Main application component
├── components/
│   ├── ui/                  # Shadcn/ui components
│   ├── CurrentWeatherSection.jsx    # Left panel with current weather
│   ├── WeatherDetailsSection.jsx    # Right panel with details
│   ├── ForecastCard.jsx             # Individual forecast day card
│   ├── LocationModal.jsx            # City search dialog
│   ├── ThemeSwitcher.jsx            # Theme toggle button
│   ├── LoadingScreen.jsx            # Loading states
│   ├── ErrorBanner.jsx              # Error message display
│   └── weather-api.js               # Weather API utilities
├── contexts/
│   └── ThemeContext.jsx     # Theme state management
├── hooks/
│   └── useWeatherData.js    # Weather data logic hook
├── public/
│   └── images/              # Background images and assets
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
\`\`\`

## 🛠️ Built With

### **Core Technologies**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **UI Components**
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components

### **APIs & Services**
- **[OpenWeatherMap API](https://openweathermap.org/api)** - Weather data
- **[IP Geolocation API](https://ipapi.co/)** - Location fallback
- **[Browser Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)** - GPS location

## 🌐 API Reference

### Weather Data Endpoints

\`\`\`javascript
// Current weather by city name
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

// Current weather by coordinates
GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric

// 5-day forecast
GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
\`\`\`

### Response Format

\`\`\`json
{
  "location": "New York, US",
  "temperature": 22,
  "condition": "sunny",
  "humidity": 65,
  "windSpeed": 12,
  "description": "clear sky",
  "feelsLike": 24,
  "forecast": [
    {
      "day": "Tomorrow",
      "high": 25,
      "low": 18,
      "condition": "cloudy"
    }
  ]
}
\`\`\`

## 🎨 Customization

### **Themes**
Modify theme colors in \`contexts/ThemeContext.jsx\`:

\`\`\`javascript
const themes = {
  dark: {
    background: '#1E1E1E',
    rightSection: '#222831',
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)'
    }
  }
}
\`\`\`

### **Background Images**
Replace images in \`public/images/\` and update references in components.

### **Weather Icons**
Customize weather icons in \`components/WeatherIcon.jsx\`:

\`\`\`javascript
const iconMap = {
  sunny: <Sun className={\`\${className} text-yellow-400\`} />,
  cloudy: <Cloud className={\`\${className} text-gray-400\`} />,
  // Add more conditions...
}
\`\`\`

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Other Platforms**

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

**Environment Variables for Production:**
- \`NEXT_PUBLIC_WEATHER_API_KEY\` - Your OpenWeatherMap API key

## 🧪 Testing

\`\`\`bash
# Run development server
npm run dev

# Build and test production build
npm run build
npm start

# Check for TypeScript errors
npm run type-check
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

### **Development Guidelines**
- Follow the existing code style and structure
- Add proper TypeScript types for new components
- Test your changes on different screen sizes
- Ensure error handling for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[OpenWeatherMap](https://openweathermap.org/)** for providing free weather data
- **[Shadcn/ui](https://ui.shadcn.com/)** for beautiful UI components
- **[Vercel](https://vercel.com/)** for excellent hosting and deployment
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/weather-app/issues) page
2. Create a new issue with detailed information
3. Include your browser, OS, and steps to reproduce

## 🔮 Future Enhancements

- [ ] **Hourly Forecast** - 24-hour weather predictions
- [ ] **Weather Alerts** - Severe weather notifications
- [ ] **Weather Maps** - Interactive radar and satellite maps
- [ ] **Historical Data** - Past weather trends and comparisons
- [ ] **Multiple Locations** - Save and switch between favorite cities
- [ ] **Weather Widgets** - Embeddable weather components
- [ ] **PWA Support** - Install as a mobile app
- [ ] **Voice Search** - Search cities using voice commands

---

**Made with ❤️ and ☀️ by [Your Name]**

*Star ⭐ this repository if you found it helpful!*
