# Changelog

All notable changes to the Santabogela Poultry Farm website project are documented in this file.

---

## Phase 1 and 2 Versions

### v1.0 â€“ Initial Part 1 Submission
- Initial commit with folder structure and base HTML pages (`index.html`, `about.html`, `ourproducts.html`, `ourteam.html`, `eggfunfacts.html`, `contacts.html`)
- Created semantic HTML structure using `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` tags
- Implemented navigation menu with links across all pages
- Added researched content about Santabogela Poultry Farm, its history, products, team, and egg facts
- Set up private GitHub repository with initial README documentation
- Added HTML comments and consistent indentation throughout all pages

### v1.1 â€“ Part 2 Initial CSS Implementation
- Created external CSS stylesheet (`css/style.css`) and linked to all HTML pages
- Implemented CSS reset for cross-browser consistency
- Established base typography using Google Fonts (Poppins)
- Applied colour scheme reflecting farm branding:
  - Primary: Deep Blue (#1d3557)
  - Accent: Golden Yellow (#ffdd57)
  - Secondary: Steel Blue (#457b9d)
  - Background: Light Grey (#f4f4f4)
  - Text: Charcoal (#333333)
- Set default styling for consistent font family, sizes, and spacing
- Added Flexbox navigation layout and CSS Grid for galleries and product cards
- Implemented hover effects on navigation links, buttons, and cards

### v1.2 â€“ Part 2 Layout and Visual Styling
- Implemented CSS Grid and Flexbox layouts for structured content presentation
- Created responsive product grid, gallery grid, and contact card layouts
- Applied visual styling including backgrounds, borders, box shadows, and border-radius
- Developed pseudo-classes for interactive elements (`:hover`, `:focus`, `:active` states)
- Styled all page components including headers, hero sections, main content areas, and footers
- Added hero banner with background image overlay on all pages

### v1.3 â€“ Part 2 Responsive Design
- Implemented media queries for multiple breakpoints:
  - Desktop: 1200px and above
  - Tablet: 768px â€“ 992px
  - Mobile: 320px â€“ 767px
  - Small mobile: 480px and below
- Created responsive navigation menu that stacks vertically on mobile devices
- Optimised images with `max-width: 100%` and `object-fit: cover` for different screen sizes
- Adjusted typography scales for readability across devices using `rem` units
- Modified grid layouts to stack appropriately on smaller screens (multi-column to single-column)
- Added `overflow-x: hidden` to prevent horizontal scrolling on narrow viewports

### v1.4 â€“ Part 2 Accessibility and Content Improvements
- Added descriptive `alt` attributes to all images across the website
- Improved semantic HTML structure and content organisation for readability
- Added `class="active"` to current page navigation links on every page
- Set `lang="en-ZA"` on all HTML documents for South African English
- Updated spelling to South African English throughout (e.g. specialise, flavour, colour)
- Added styles for fun facts list, team gallery, and contact message sections

### v1.5 â€“ Part 2 Bug Fixes and Code Cleanup
- Corrected student name to **Kgopotse Mashile** and student number **ST10500995** across all pages and documentation
- Removed invalid markdown syntax (`html5` text and triple backticks) from `css/style.css` that broke stylesheet parsing
- Fixed hero background image path from `images/` to `../images/` so the banner displays correctly from the CSS folder
- Removed broken duplicate stylesheet link (`href="style.css"`) from all pages; retained correct `css/style.css` link only
- Removed stray markdown backticks and trailing whitespace from HTML files
- Fixed broken image path on the team page (`images/us.jpg` had a trailing space)
- Added Google Fonts link consistently to all pages, including the home page
- Standardised navigation labels to **Contact Us** on all pages

### v1.6 â€“ Part 2 File Renaming and Contact Page Fix
- Renamed page files for cleaner URL structure:
  - `ourproducts.html` â†’ `products.html`
  - `ourteam.html` â†’ `team.html`
  - `contacts.html` â†’ `contact.html`
- Updated all navigation links and button references across every page
- Fixed email address overflow on the contact page using `overflow-wrap`, `word-break`, and responsive font sizing (`clamp`)
- Applied `min-width: 0` on contact grid items to prevent content breaking out of containers
- Updated contact grid to use `minmax(min(100%, 14rem), 1fr)` for better column sizing on narrow screens
- Added footer text wrapping for long email addresses

### v1.7 â€“ Part 2 Final Refinement and Documentation
- Conducted cross-browser compatibility testing (Chrome, Firefox, Safari, Edge)
- Performed responsive design testing across desktop, tablet, and mobile viewport sizes
- Refined spacing, alignments, and visual hierarchy across all pages
- Optimised CSS code structure with clear section comments
- Restructured README.md to match project documentation standards
- Created CHANGELOG.md with comprehensive version history
- Updated sitemap documentation to reflect renamed page files

---

## Phase 3 Versions

### v2.0 - JavaScript Foundation and Form Validation
- Added shared JavaScript file (`javascript/script.js`) and linked it across the website
- Added contact enquiry form on `contact.html` with fields for name, email, phone number, product interest, and message
- Implemented client-side validation for required fields, email format, and phone number format
- Added clear validation messages and success feedback using an accessible live status message
- Added product enquiry buttons on `products.html` that preselect the relevant product on the contact form
- Added mobile navigation toggle controlled by JavaScript with `aria-expanded` support

### v2.1 - Interactive Features
- Implemented image gallery lightbox for gallery images and about page farm image
- Added keyboard support for opening images and Escape key support for closing the lightbox
- Added accordion questions on the Egg Fun Facts page as an interactive content section
- Added scroll reveal animations for cards, product cards, contact cards, and gallery images
- Embedded a Google Maps location view for Winterveld, Gauteng on the contact page

### v2.2 - SEO, Accessibility, and Deployment Readiness
- Added unique meta descriptions, keywords, and author meta tags to all main pages
- Added skip-to-content links and primary navigation ARIA labels across the website
- Added lazy loading to gallery, product, team, contact, and about images
- Added `robots.txt` and `sitemap.xml` to support search engine crawling
- Created a custom `404.html` page for deployment platforms such as GitHub Pages or Netlify
- Updated CSS to support the new form, accordion, map embed, lightbox, mobile menu, and animation states
