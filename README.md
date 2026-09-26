# 💪 FitLog — Train With Intent. Log Every Set.

A dark, high-performance gym companion and workout tracker built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. FitLog lets you browse compound lifts, review exercise specifications, schedule lifts into your daily routine (capped at 5 lifts), track live workout metrics, and persist your training log across sessions.

---

## 🚀 Live Demo & Repository

- **Live Link:** [https://fitlog-app.vercel.app](https://fitlog-app.vercel.app) *(Replace with your deployed URL)*
- **GitHub Repository:** [https://github.com/your-username/fitlog](https://github.com/your-username/fitlog) *(Replace with your repository URL)*

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Core framework, server rendering, dynamic routing, and fast navigation |
| **TypeScript** | Type safety, maintainability, and clean data contracts |
| **Tailwind CSS v4** | Custom gym dark theme, responsive utilities, and fluid animations |
| **Lucide React** | Modern, lightweight fitness and action icons |
| **Sonner** | Interactive, dark-themed toast notification system |
| **Google Fonts (Oswald & Inter)** | Aggressive uppercase gym display typography paired with clean body text |

---

## 🌟 5 Key Features

### 1. 🏋️ Curated 12-Lift Workout Library with Interactive Filters
- Fetches real-time workout specifications from the FitLog API with smooth skeleton card loading states.
- Responsive **3x4 grid** on desktop collapsing smoothly for tablet and mobile devices.
- Includes quick category filtering chips (`CHEST`, `BACK`, `LEGS`, `ARMS`, `SHOULDERS`, `CORE`) and a live keyword search bar.

### 2. ⚡ Challenge C1: Dynamic Multi-Attribute Sorting
- Dedicated **"Sort By" dropdown** with custom chevron icon allowing instant client-side re-sorting.
- Supports sorting by **Duration (Mins)**, **Calories Burned (Kcal)**, and **Rating (High to Low)**.
- Defaults to Duration and updates card arrangements dynamically without reloading.

### 3. 📖 Two-Column Detailed Exercise View (`/workout/:id`)
- Visual media column with high-resolution illustration, difficulty badge, and rating overlay.
- Detailed **Key Specifications** panel: Equipment, Difficulty, Target Sets, Reps per Set, Duration, and Calories.
- Ordered 4-step exercise instructions with numbered indicator badges.
- Direct **"Add to Today's Plan"** and **"Save for Later"** buttons with instant feedback toasts.

### 4. 📊 Live Metrics Summary Dashboard & 5-Lift Daily Cap
- Dynamic stat cards in `/my-plan` that calculate **Total Exercises**, **Total Estimated Minutes**, and **Total Calories Burned** live.
- Enforces a disciplined **5-lift daily cap** to keep training sessions focused, notifying users when the limit is reached.
- Real-time navbar badge counters: filled accent pill for **Plan** and bordered pill for **Saved**.

### 5. 🎯 Challenge C3: Interactive Plan Actions & LocalStorage Persistence
- **Mark as Done**: Completed workouts receive visual strikethrough, glowing badges, and milestone toast notifications.
- **Remove (X)**: Easily rack away completed or unwanted lifts from the plan with confirmation toasts.
- **LocalStorage Sync**: Both Today's Plan and Saved workouts persist seamlessly across page reloads without hydration mismatches.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js `v18.17` or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fitlog.git
   cd fitlog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Build & Deployment

To verify and produce an optimized production bundle:

```bash
npm run build
npm run start
```

Deployable with zero configuration on **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 📄 License & Credits

&copy; 2026 FitLog — Workout Library. Train hard, log honest.
