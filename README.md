# Flare Studios — Where Ideas Ignite ✦

Flare Studios is a premium, high-performance creative studio website designed with a minimalist, luxury aesthetic. Built for brands that demand attention, the site features immersive animations, a professional glassmorphism design system, and seamless contact integration.

![Flare Studios Banner](https://flarestudios.in/og-image.jpg)

## 💎 Premium Features

- **Luxury Aesthetic**: Curated color palette (Cream, Gold, Ink) with a sophisticated grid-based design system.
- **Immersive Backgrounds**: Layered, hardware-accelerated spinning decorative elements and interactive blobs.
- **Dynamic Reveal Animations**: Smooth, high-performance scroll-triggered content reveals using Intersection Observer.
- **Fully Responsive**: Optimized for every screen size, from large desktop monitors to compact mobile devices.
- **Seamless Contact System**: Integrated with **EmailJS** for silent, direct email transmission without leaving the site.
- **Fluid Typography**: Responsive font scaling using CSS `clamp()` and premium Google Fonts (Playfair Display & DM Sans).

## 🚀 Tech Stack

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Design System)
- **Logic**: Vanilla JavaScript (ES6+)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Typography**: [Google Fonts](https://fonts.google.com/)

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/flareStudio.git
   ```
2. **Open the project**:
   Open `index.html` in your browser.
3. **Run with Live Server (Recommended)**:
   Use the VS Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for the best experience (auto-refresh and proper path handling).

## 📧 Configuration (EmailJS)

To enable the contact form, you need to add your own EmailJS keys:

1. **Public Key**: Located in `index.html`.
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
2. **Service & Template IDs**: Located in `main.js`.
   ```javascript
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams);
   ```

## 🎨 Design Tokens

| Property | Value | Description |
| :--- | :--- | :--- |
| **Gold** | `#B8872A` | Primary accent for buttons and highlights |
| **Ink** | `#1A1A1A` | Deep, sophisticated text color |
| **Cream** | `#FDFBF4` | Soft, premium background base |
| **Grid** | `1px` | Subtle background texture for depth |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created with obsession by **Flare Studios**.
