# 🌍 TravelVista - Student Travel Companion

TravelVista is a modern, responsive web application designed for students and young travelers looking to explore India on a budget. It features a stunning glassmorphic UI, dynamic theme switching (Dark/Light mode), and a robust **Owner Dashboard** that allows the site owner to customize the typography and content of every page in real-time.

---

## ✨ Key Features

### 1. Modern User Interface
- **Glassmorphism Design:** Beautiful semi-transparent frosted glass elements that blend seamlessly with high-quality background imagery.
- **Dynamic Theming:** Built-in Light/Dark mode toggle that instantly adapts all colors, shadows, and text elements.
- **Fully Responsive:** Fluid grid layouts that look great on Desktop, Tablet, and Mobile devices.

### 2. Comprehensive Travel Tools
- **Budget Calculator:** An interactive tool to help students estimate their daily travel expenses based on destination types and travel styles.
- **Hostel Directory:** Verified, budget-friendly social hostels with pricing, ratings, and amenity indicators.
- **Destinations & Hidden Gems:** Curated lists of popular Indian destinations and off-the-beaten-path locations, complete with modal image galleries.

### 3. Powerful Owner Dashboard (CMS)
TravelVista includes a custom-built Content Management System (CMS) accessible via the `/owner-login` route (Default credentials: `admin` / `password123`).

- **Rich Typography Editor:** The owner can modify the exact look and feel of every page's main banner. Controls include:
  - Text Content (Headings & Subtitles)
  - Colors (Live Hex Picker)
  - Font Families (Outfit, Inter, Roboto, Montserrat, etc.)
  - Font Weights & Styles (Normal, Italic, Bold, etc.)
  - Sizing, Letter Spacing, Text Transform, and Decoration.
- **Live Preview:** Changes instantly reflect in a live preview pane before saving.
- **Persistent Storage:** All custom settings are saved via the React Context API directly into the browser's `localStorage`, ensuring instant loading and data persistence without needing a backend database.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Vanilla CSS with CSS Variables for theme management.
- **Icons:** `react-icons`
- **State Management:** React Context API (`DataContext`, `ThemeContext`, `AuthContext`)
- **Deployment:** Vercel (Configured with `vercel.json` for SPA routing)

---

## 🚀 Running Locally

1. **Install Dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

The project is fully configured to be deployed on **Vercel**. 

Because this is a Single Page Application (SPA), a `public/vercel.json` configuration file is included to rewrite all routes to `index.html`. This ensures that direct links (like `/destinations` or `/about`) load correctly without throwing 404 errors.

To deploy:
1. Connect your GitHub repository to Vercel.
2. Set the Production Branch to `main`.
3. Vercel will automatically build the site using `npm run build` and deploy the `dist/` directory.

---

## 📁 Project Structure

- `src/components/` - Reusable UI elements (Navbar, Footer, Modals, Cards, ThemeToggle)
- `src/pages/` - The main views (Home, About, Destinations, OwnerDashboard, etc.)
- `src/context/` - Global state providers
- `src/data/` - Static JSON data for hostels, destinations, and FAQs
- `src/index.css` & `src/App.css` - Global styles and design tokens
- `public/` - Static assets and Vercel configuration
