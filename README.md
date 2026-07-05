# Daily Shaper

Daily Shaper is a premium, gamified single-page fitness and habit tracker designed specifically for remote workers, students, and desksitters who spend long hours sitting at home. It helps users stay active, lose weight, care for their neck and knee joints, track hydration, and maintain daily calorie budgets.

## Features

1. **🌟 Interactive Onboarding Wizard**
   - Personalizes targets on first launch.
   - Calculates health metrics dynamically using standard clinical formulas.

2. **📊 Dynamic Metabolism Profiles**
   - **BMI**: Calculated as \(\text{Weight} / \text{Height(m)}^2\) with WHO categories (*Underweight / Normal / Overweight / Obese*).
   - **BMR (Mifflin-St Jeor)**:
     - Male: \(10 \times W + 6.25 \times H - 5 \times A + 5\)
     - Female: \(10 \times W + 6.25 \times H - 5 \times A - 161\)
   - **TDEE**: Multiplies BMR by activity factor (Sedentary: 1.2x, Lightly Active: 1.375x, Moderately Active: 1.55x).
   - **Calorie Budget**: Set to TDEE - 500 kcal for active weight loss (capped at a healthy minimum of 1200 kcal for women and 1500 kcal for men).

3. **💧 Hydration Tracker widget**
   - Quick-add buttons (`+250ml`, `+500ml`, `+1L`) and custom intake input.
   - Updates animated SVG water progress rings.
   - Undo function to reverse logs.

4. **🔥 Calories Tracker widget**
   - Log meals by type (breakfast, lunch, dinner, snack) with calorie calculations.
   - Remaining calorie budget: \(\text{Budget} - \text{Consumed} + \text{Burned (via workouts)}\).
   - Completed workout items automatically count as 25 kcal burn per item.

5. **⚡ Gamification (Levels & XP)**
   - XP level badge and inline level progress bar in the topbar.
   - Check off a food item: +10 XP.
   - Check off a workout item: +15 XP.
   - bank break round: +30 XP.
   - Complete whole workout checklist: +50 XP bonus.
   - Level formula: \(\lfloor \text{XP} / 200 \rfloor + 1\). Leveling up rewards users with visual celebrations.

6. **🎨 Premium UI Redesign & Dark Mode**
   - Interactive bottom navigation for mobile viewport sizes.
   - Clean aesthetics with Google Fonts (`Inter`, `Syne`, `Space Mono`) and glassmorphism.
   - Glowing neon dark mode toggle.

7. **📈 Dynamic SVGs (Progress Tab)**
   - SVGs for Weight Trend, Daily Compliance, and a new Water history chart.
   - Interactive activity heatmap logs for the last 70 days.

## File Structure

```
daily-shaper/
├── index.html      # Mobile bottom nav, onboarding overlays, trackers
├── style.css       # Glow states, dark/light theme variables, card styles
├── app.js          # Onboarding validation, metabolic logic, SVGs, timers
├── package.json    # Serve and test launch configs
└── tests/
    └── logic.test.js # Verification tests for core calculations
```

## Running the Application Locally

1. **Serve the project**:
   Use `npx serve` to launch a local server:
   ```bash
   npx serve . -p 3000
   ```
2. **Open in Browser**:
   Navigate to `http://localhost:3000` to start onboarding.

## Running Tests

Verify pure functions and calculations with:
```bash
npm test
```
