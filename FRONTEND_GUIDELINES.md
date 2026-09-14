# Frontend Guidelines (Income Estate Next.js)

### 🎯 Primary Objective: High-Quality Next.js UI Development (Frontend Phase)
Our focus is building a clean, modern, high-performing, and component-driven Next.js (App Router) frontend with luxury editorial design intent.

### ⚠️ STRICT RULES:
1. **NO BACKEND / API CALLS / ADMIN LOGIC**:
   - Do NOT write database connections, backend routes, CMS collections, or complex backend logic.
   - Keep the focus 100% on the Next.js frontend UI layer.

2. **NO CODE GUESSWORK / UNWANTED REDESIGN**:
   - Stick 100% to the agreed design system, visual hierarchy, CSS classes, and styling rules.
   - Maintain the exact luxury editorial design intent.

3. **MODULAR COMPONENT STRUCTURE**:
   - Build reusable, clean React components (Header, PropertyCard, FilterSidebar, HeroSection, PropertyDetails, Footer, BlogCard, etc.).

4. **MOCK DATA PROPS**:
   - Make components dynamic by accepting TypeScript props.
   - Feed them with clean, structured local mock data in `src/data/`.

5. **IMAGE OPTIMIZATION**:
   - Use Next.js `<Image>` component (`next/image`) with proper responsive sizing (`fill`, `sizes`, `alt`) to ensure 0 layout shift (CLS).

6. **STATE & INTERACTION ONLY**:
   - Implement client-side UI interactions (mobile menu toggles, image sliders, modals, tab switching, client-side filters, toast feedback).

---

### 📂 Step-by-Step Workflow:
1. Define component outline and TypeScript prop interfaces.
2. Build clean Next.js App Router structure (`/app`, `/components/...`).
3. Keep the data structures clean so that later backend / headless CMS fields can be connected seamlessly without rewriting the UI.

