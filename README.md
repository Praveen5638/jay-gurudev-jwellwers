# 👑 Jay Gurudev Jewellers

> **The Prestigious House of Gold in Prayagraj — A Royal Symphony of Purity, Artistry, and Trust for Over 3 Decades.**

This is the official web showcase and inventory management portal for **Jay Gurudev Jewellers** (Civil Lines & Devghat, Prayagraj). It provides clients with an immersive static catalog of gold, silver, and diamond jewelry, alongside a secure, gated Administrator Dashboard for real-time showroom management.

---

## ✨ Key Showroom Features

### 1. 🎭 Auto-Playing Luxury Hero Slider
* **Immersive Visuals**: Features an interactive, auto-playing slider loaded with high-fidelity, custom-designed jewelry catalog exhibits:
  * **Royal Bridal Collection** (Kundan & Uncut Polki)
  * **22K Gold Heritage** (Antique Temple carvings)
  * **Modern Solitaire Diamonds** (Elegant daily wear)
  * **92.5 Sterling Silver** (Traditional elephant kadas and payals)
* **Smart Interaction**: Automatically pauses auto-play when a user hovers over the slider (`pause-on-hover`) and resumes upon mouse leave. Includes custom glassmorphic arrow controls and responsive indicator dots.
* **Entrance Micro-Animations**: Utilizes React dynamic key bindings to re-trigger smooth `.fade-in-up` entry animations for titles, badges, and CTA buttons on every slide transition.

### 2. 🔒 Secure Catalog Administrator Dashboard
* **Predefined Gated Access**: A high-contrast, secure login screen protects the catalog from unauthorized inventory changes:
  * **Username**: `admin`
  * **Password**: `gurudev@1995` *(Symbolizes 1995, the prestigious year of establishment in Devghat, Prayagraj)*
* **Persistent Session Management**: Employs `sessionStorage` to maintain auth state across reload tabs, prompting for credentials only on new browser sessions or when manually clicking the **Logout** button.
* **Dashboard Utilities**:
  * **Showroom Statistics**: Real-time stats count of total jewelry listings, metal categories (Gold, Silver, Diamond), and active client orders.
  * **Product Inventory Management (CRUD)**: Fully functional forms to add new arrivals, edit weight/purity/price details, and delete sold-out items.
  * **Promo Banner Settings**: Allows the administrator to globally toggle or update the top promo bar text (e.g., *Wedding Season Specials*) across all routes instantly.
  * **Customer Inquiries**: Collects purchase inquiries submitted by clients, allowing one-click call-backs or automated custom WhatsApp replies.

### 3. 🔍 Bulletproof Case-Insensitive Product Filters
* **Robust Normalization**: Catalog filters in the Collection page are designed to scale smoothly with thousands of items.
* **Casing & Whitespace Trimming**: Integrates `.trim().toLowerCase()` checks on categories and materials, preventing subtle spacing bugs or casing discrepancies between database items and user actions.

### 4. 📐 Viewport-Aware Responsive Layout (Mobile & Laptop Perfect)
* **Sticky Navigation Header**: Replaced `fixed` header styling with standard CSS `sticky` properties, ensuring that primary page elements sit naturally in the document flow without overlap.
* **Compact Laptop Bounds**: Scaled slider dimensions to responsive bounds (`h-[calc(100vh-140px)] lg:h-[calc(100vh-150px)]`) to ensure the entire hero card and CTA buttons fit on standard 13" and 15" screens without overflow.
* **Normalized Spacing**: Normalized padding values from `pt-28` to a tidy `pt-10` across all page wrappers to maintain visual symmetry across desktop and mobile screens.

---

## 🛠️ Technology Stack

* **Core Library**: [React 19](https://react.dev/)
* **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
* **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
* **Styling & Theme Framework**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons Pack**: [Lucide React](https://lucide.dev/)
* **Routing Manager**: [React Router DOM v7](https://reactrouter.com/) (Employs `HashRouter` to prevent custom route 404 reload errors on static CDNs).

---

## 💻 Local Development Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (LTS recommended) installed on your system.

### Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Dev Server**:
   ```bash
   npm run dev
   ```
   * Open your browser and navigate to `http://localhost:5173`.

3. **Compile Production Bundle**:
   ```bash
   npm run build
   ```
   * Compiles the source files into highly optimized production-ready static assets under the `dist/` directory.

4. **Run Static Code Linter**:
   ```bash
   npm run lint
   ```

---

## 🚀 Netlify Deployment Guide

This project is pre-configured and optimized for static hosting platforms like **Netlify**.

### Easiest Deployment (Drag & Drop):
1. Run `npm run build` locally to generate the `dist/` folder.
2. Go to [netlify.com/drop](https://app.netlify.com/drop) and drag-and-drop the generated `dist/` folder. Your luxury jewelry showroom will be live in 10 seconds!

### Professional Deployment (GitHub Continuous Integration):
1. Push this repository to your **GitHub** account.
2. Create a new site in **Netlify**, select **Import an existing project**, and authorize your GitHub repository.
3. Configure the build parameters as:
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
4. Click **Deploy**. Netlify will automatically build and publish your updates every time you push to the `main` branch.
