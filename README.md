# 💗 Pink Planet: Tech Crush 🎮⚡

**Pink Planet: Tech Crush** is a cute, addictive, cyber-pink Match-3 puzzle web game. Swap hardware components, set off explosive combo chain reactions, defeat retro Virus Bosses, and build your custom Pink Dream PC!

---

## 🌟 Key Features

* 🧠 **Computer Hardware Components:** Swap CPU chips, RAM sticks, GPUs, Circuit boards, RGB Cooling Fans, and M.2 SSDs.
* ⚡ **CPU Power Burst:** Match 4 components in a row/column to create a line-clearing electric burst.
* 🌈 **GPU Laser Bomb:** Match 5 in a row to forge a rainbow GPU Laser that clears all components of any chosen type.
* 💥 **RGB Fan Area Blast:** Match in L or T shapes to create a 3x3 explosive fan bomb.
* 👾 **Virus Boss Battles:** Fight corrupting bosses like *MegaByte Virus* and *Trojan Titan 9000*! Bosses take damage from your matches and corrupt tiles if left unchecked!
* 🖥️ **Build Your PC Workshop:** Earn Tech Coins from matches to purchase and assemble 8 hardware upgrades that unlock permanent passive perks (+moves, starting boosters, score multipliers).
* 🗺️ **15 Level Campaign Map:** Progress across 4 distinct Pink Planet regions with target scores, component collecting goals, and star ratings.
* 🎵 **Procedural Web Audio Engine:** Self-contained Web Audio API synth sound FX & synthwave background music loop—zero external audio loading delay.
* 📱 **Mobile & Desktop Responsive:** Touch gesture swiping and mouse drag/click support with full glassmorphism design.
* 💾 **Progress Saving:** Auto-saves level unlocks, star ratings, Tech Coins, and PC Builder inventory to `localStorage`.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic game markup and modal overlays.
- **CSS3:** Modern Cyber-Pink Glassmorphism UI design system, custom SVG animations, keyframes, and flex/grid layouts.
- **JavaScript (ES6+):** Pure object-oriented modular game logic without heavyweight external frameworks.
- **Web Audio API:** Real-time procedural audio synthesis for sound FX and BGM.
- **HTML5 Canvas:** Particle FX layer for explosive bursts and lasers.

---

## 🚀 How to Deploy to Vercel

You can deploy **Pink Planet: Tech Crush** directly to Vercel in just a few clicks!

### Option 1: Vercel CLI (Fastest)

1. Open your terminal in the project directory:
   ```bash
   cd candy
   ```
2. Install the Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```
3. Run the deployment command:
   ```bash
   vercel
   ```
4. Follow the prompts (press Enter for defaults). Your game will be instantly live on a custom `.vercel.app` URL!

---

### Option 2: Deploy via GitHub & Vercel Dashboard

1. Push this project repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Pink Planet Tech Crush"
   git remote add origin https://github.com/YOUR_USERNAME/pink-planet-tech-crush.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com/).
3. Click **"Add New..."** -> **"Project"**.
4. Import your `pink-planet-tech-crush` GitHub repository.
5. Keep default settings and click **"Deploy"**.

---

## 🎮 How to Play Local Preview

To test and play locally on your machine:

```bash
npx serve .
```
Then open `http://localhost:3000` in your web browser!
