# Fahad Mohamed — Portfolio

[![Website](https://img.shields.io/badge/Website-fahadmohamed.in-79aafc?style=flat&logo=googlechrome&logoColor=white)](https://fahadmohamed.in)

The personal engineering portfolio and website of **Fahad Mohamed**, a Senior QA Automation Engineer and SDET with 9+ years of experience building resilient test automation architectures, UI/API frameworks, and CI/CD pipelines.

---

## 🎯 Purpose of This Repository

This repository hosts the source code for [fahadmohamed.in](https://fahadmohamed.in). It serves as a central hub to showcase:
- **Automation Philosophy & Technical Ownership:** Deep experience in scalable framework design using Playwright (TypeScript/JavaScript), Selenium WebDriver (Java), REST Assured, and Cucumber BDD.
- **Enterprise Track Record:** Hands-on SDET contributions across critical domains including Healthcare (Optum / UHG), Banking & Wealth Management (Morgan Stanley), and Education (British Council).
- **Personal Projects:** Full-lifecycle development explorations, such as **MileageTracker** (an AI-assisted Android application).
- **Modern Front-End Engineering:** A lightweight, high-performance portfolio crafted with modern CSS techniques, fluid interactions, and zero third-party framework overhead.

---

## ✨ Key Features & Implementation Details

### 1. Animated Navigation & Scroll-Spy System
- **Sliding Underline Indicator:** A custom-styled `.nav-indicator` pill featuring an ambient cyan/blue gradient (`#79aafc` to `#a6b8ff`) that smoothly glides and morphs width between active tabs.
- **Scroll-Aware Tracking:** Utilizes a lightweight, `requestAnimationFrame`-throttled scroll spy that tracks current section visibility in real time.
- **Smooth Click Handling:** Clicking any navigation link immediately locks the active state to the target tab while smooth scrolling proceeds, preventing intermediate flicker.
- **Mobile Responsive Drawer:** Collapses into a clean drawer on mobile viewports with dedicated active state styling.

### 2. Continuous Ambient Grid Background
- **Seamless 1:1 Scrolling Pattern:** An architectural checked grid (`42px × 42px`) rendered via CSS gradients that scrolls continuously with document content rather than staying pinned to the viewport.
- **Distributed Radial Illumination:** Multi-stop ambient radial glow gradients (`#5a91ff`) positioned across all major page sections (Hero, About, Experience, Skills, Project, Contact), ensuring consistent visual depth from top to bottom.

### 3. macOS Window Code Presentation
- **Authentic Traffic Light Controls:** The featured personal project (`MileageTracker`) is framed within a dark code window equipped with authentic macOS traffic light buttons:
  - Close (`×` in red `#ff5f56`)
  - Minimize (`–` in yellow `#ffbd2e`)
  - Expand (`+` in green `#27c93f`)
- Styled with subtle resting symbols that sharpen on hover.

### 4. Custom Vector Brand Favicon
- Fully self-contained SVG favicon (`favicon.svg`) rendering the `FM.` brand logo in bold `Space Grotesk` vector shapes with high-contrast dark gradient backing, sharp at any browser scale.

### 5. Netlify Contact Form & Spam Protection
- Fully functional contact form integrated with Netlify Forms.
- Includes client-side asynchronous submission handling, visual feedback states, and honeypot field protection against automated spam.

---

## 🛠️ Technology Stack

| Layer | Implementation |
| :--- | :--- |
| **Markup** | Semantic HTML5, ARIA accessibility attributes, Open Graph meta tags |
| **Styling** | Modern CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism, Backdrop Filters) |
| **Scripting** | Vanilla JavaScript (ES6+, zero dependencies, `IntersectionObserver`, `requestAnimationFrame`) |
| **Fonts** | Inter & Space Grotesk (via Google Fonts) |
| **Hosting & CI** | Netlify (Static edge deployment, custom domain, automated SSL) |

---

## 📂 Repository Structure

```text
├── index.html                  # Main semantic HTML document & structure
├── styles.css                  # Core design system, variables, layouts, and responsive queries
├── script.js                   # Navigation tracking, scroll-spy, reveal animations, and form logic
├── favicon.svg                 # Scalable vector favicon (FM.)
├── Fahad_Mohamed_Resume.pdf    # Downloadable resume document
├── netlify.toml                # Netlify deployment configuration
└── README.md                   # Project documentation & overview
```

---

## 🚀 Deployment

The site is configured for zero-build static hosting:
- **Build Command:** *(none / static)*
- **Publish Directory:** `.`
- **Configuration:** Managed via [`netlify.toml`](./netlify.toml)
- Any push to the `main` branch automatically deploys to production on Netlify.

---

## 📬 Contact & Links

- **Website:** [fahadmohamed.in](https://fahadmohamed.in)
- **LinkedIn:** [www.linkedin.com/in/fahadmdsultan](https://www.linkedin.com/in/fahadmdsultan)
- **GitHub:** [@fahadrafan](https://github.com/fahadrafan)
- **Email:** [fahadmdsultan@outlook.com](mailto:fahadmdsultan@outlook.com)
