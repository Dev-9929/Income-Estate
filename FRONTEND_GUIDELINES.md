# Frontend-Only Conversion Guidelines (Income Estate Next.js)

### 🎯 Primary Objective: Strict UI Conversion (Frontend-Only Phase)
We have the complete HTML/CSS design ready. Right now, our ONLY focus is to accurately convert static HTML/CSS into a clean, modern, component-driven Next.js (App Router) frontend.

### ⚠️ STRICT RULES:
1. **NO BACKEND / API CALLS / ADMIN LOGIC**:
   - Do NOT write database connections, backend routes, CMS collections, or complex backend logic.
   - Keep the focus 100% on the Next.js frontend UI layer.

2. **NO CODE GUESSWORK / UNWANTED REDESIGN**:
   - Stick 100% to the layout, visual hierarchy, CSS classes, and styling provided in the HTML/CSS source.
   - Maintain the exact luxury editorial design intent.

3. **MODULAR COMPONENT STRUCTURE**:
   - Break down HTML into reusable, clean React components (Header, PropertyCard, FilterSidebar, HeroSection, PropertyDetails, Footer, BlogCard, etc.).

4. **MOCK DATA PROPS**:
   - Make components dynamic by accepting TypeScript props.
   - Feed them with clean, structured local mock data in `src/data/`.

5. **IMAGE OPTIMIZATION**:
   - Use Next.js `<Image>` component (`next/image`) with proper responsive sizing (`fill`, `sizes`, `alt`) to ensure 0 layout shift (CLS).

6. **STATE & INTERACTION ONLY**:
   - Implement client-side UI interactions only (mobile menu toggles, image sliders, modals, tab switching, client-side filters, toast feedback).

---

### 📂 Step-by-Step Workflow:
1. User provides or points to the raw HTML page/section.
2. Analyze and break it into clean Next.js App Router structure (`/app`, `/components/ui`, `/components/...`).
3. Keep the data structures clean so that later backend / headless CMS fields can be connected seamlessly without rewriting the UI.
