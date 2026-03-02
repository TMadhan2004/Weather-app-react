# 🧪 Feedback API Studio – REST Playground

A visually rich single-page React app that acts as a front-end **playground for REST APIs**. It interacts with a `feedbacks` endpoint and demonstrates real **GET, POST, PUT, DELETE** operations with a modern, animated UI.

Expected backend endpoints:
const API_BASE = 'https://rest-apis-demo.onrender.com/feedbacks';
- `GET    https://rest-apis-demo.onrender.com/feedbacks`
- `POST   https://rest-apis-demo.onrender.com/feedbacks`
- `PUT    https://rest-apis-demo.onrender.com/feedbacks/:id`
- `DELETE https://rest-apis-demo.onrender.com/feedbacks/:id`

---

## ✨ What this app does

### 🔍 GET – View all feedbacks

- Fetches all feedback items from `/feedbacks` on page load.
- Displays each feedback as a card with:
  - `id`
  - `name`
  - `age`
  - `rating` (out of 10)
  - `description`
- "Refresh" button to re-fetch data from the API.

### ➕ POST – Create new feedback

- Form fields:
  - `name`
  - `age`
  - `rating` (0–10)
  - `description`
- Sends a `POST` request to `/feedbacks` with body like:

  ```json
  {
    "name": "Abishek",
    "age": 24,
    "rating": 8,
    "description": "Dangerous if batted till end of powerplay"
  }
  ```

- The backend automatically assigns the `id` (e.g. `1`, `2`, ...).
- After a successful POST, the app refreshes the list and clears the form.

### ✏️ PUT – Update existing feedback

- You can either:
  - Click **"Edit via PUT"** on any card in the GET view to load it into the form, or
  - Manually enter an `id` and values in the PUT tab.
- Editable fields: `name`, `age`, `rating`, `description`.
- Sends a `PUT` request to `/feedbacks/:id` and refreshes the list.
- The updated card is briefly **highlighted** so you see what changed.

### �️ DELETE – Remove a feedback by id

- Simple form to enter an `id`.
- Sends a `DELETE` request to `/feedbacks/:id`.
- On success, refreshes the list and clears the field.

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast development server and build tool
- **CSS3** - Advanced animations and glassmorphism effects
- **JavaScript ES6+** - Modern JavaScript features

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TMadhan2004/Weather-app-react.git
   cd Weather-app-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Usage

### Search Cities
Type any city name in the search bar:
- **Pre-configured cities**: New York, London, Tokyo, Paris, Sydney, Mumbai, Dubai, Singapore
- **Random cities**: Any other city name will generate random weather data

### Temperature Units
Click the °C/°F toggle to switch between Celsius and Fahrenheit

### View Forecasts
- Scroll down to see hourly and 7-day forecasts
- Hover over cards for interactive effects

## 📱 Responsive Design

The app is fully responsive and works perfectly on:
- **Mobile phones** (320px and up)
- **Tablets** (768px and up)
- **Desktop computers** (1024px and up)

## 🎨 Weather Themes

The app features dynamic backgrounds that change based on weather conditions:

- ☀️ **Clear/Sunny** - Warm orange and yellow gradients
- ☁️ **Cloudy** - Purple and pink gradients
- 🌧️ **Rainy** - Blue gradients with rain animation
- ⛈️ **Thunderstorm** - Dark blue with lightning effects
- 🌙 **Night** - Dark blue and black gradients
- 🌤️ **Hot** - Orange and red gradients

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The app builds to static files and can be deployed to:

#### Netlify
1. Run `npm run build`
2. Upload the `dist/` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

#### Vercel
1. Run `npm run build`
2. Deploy the `dist/` folder to Vercel
3. Or use Vercel's GitHub integration

#### GitHub Pages
1. Run `npm run build`
2. Deploy the `dist/` folder to GitHub Pages

## 🌟 Highlights

### Performance
- **Fast Loading**: Optimized bundle size
- **Smooth Animations**: 60fps CSS animations
- **Responsive Images**: Efficient emoji-based weather icons

### User Experience
- **Intuitive Interface**: Clean and modern design
- **Micro-interactions**: Hover effects and transitions
- **Accessibility**: Semantic HTML and keyboard navigation

### Code Quality
- **Clean Architecture**: Component-based structure
- **Modern React**: Hooks and functional components
- **Maintainable**: Well-organized CSS and JavaScript

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather icons using native emojis for universal compatibility
- Glassmorphism design inspired by modern UI trends
- Built with modern web technologies for the best user experience

---

**Made with ❤️ using React + Vite**
