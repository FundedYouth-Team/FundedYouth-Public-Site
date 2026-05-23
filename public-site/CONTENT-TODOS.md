# Content TODOs

Pending content swaps for the FundedYouth public site. Each entry below is
**code that already exists** but is intentionally hidden until real content
is supplied. Grep for the marker (e.g. `TESTIMONIALS_START`) to jump to the
exact spot.

---

## 1. Homepage Testimonials section

**Where:** [src/pages/HomePage.tsx](src/pages/HomePage.tsx) — search for
`TESTIMONIALS_START` (sits between Section 8 "For Schools & Bootcamps" and
Section 9 "Final CTA").

**Status:** Wrapped in a JSX block comment so the section does not render.

### How to enable

1. Open `src/pages/HomePage.tsx` and search for `TESTIMONIALS_START`.
2. You'll see this exact structure:

   ```tsx
   {/* TESTIMONIALS_START — hidden until real quotes are supplied.
       See public-site/CONTENT-TODOS.md for enable + swap instructions. */}
   {/*
   <section className="relative bg-gradient-to-b from-white to-blue-50 ...">
     ...
   </section>
   */}
   {/* TESTIMONIALS_END */}
   ```

3. **Delete two lines** to enable the section:
   - The line containing just `{/*` (directly above `<section>`)
   - The line containing just `*/}` (directly below `</section>`)
4. (Optional) Delete the `TESTIMONIALS_START` and `TESTIMONIALS_END`
   markers too — they're just search anchors.
5. Run `pnpm dev` to confirm the section renders between "For Schools
   & Bootcamps" and "Final CTA".

### How to replace the sample testimonials

Inside the section, the testimonials live in an array passed to `.map()`:

```ts
{[
  {
    quote: "I came in not knowing what a slicer was...",
    name: "Maya R.",
    role: "Grade 7 student",
    context: "3DP1 graduate",
    accent: "from-blue-500 to-cyan-500",
  },
  ...
]}
```

For each entry:
- **quote** — 1–3 sentences. Plain text. Avoid quotation marks at the
  start/end; the quote-mark visual is rendered above the text.
- **name** — Display name (e.g. "Maya R." or "Maya Ramirez"). First name +
  last initial is the safest default for student attributions.
- **role** — Relationship to FundedYouth: "Grade 7 student", "Parent of
  two", "STEAM teacher", etc.
- **context** — Optional secondary descriptor: a course code they
  completed, a city, a school name. Shown after a "·" separator.
- **accent** — Tailwind gradient classes used for the top accent bar AND
  the avatar circle. Pick one to vary visual rhythm:
  - `from-blue-500 to-cyan-500` (3D Printing energy)
  - `from-orange-400 to-amber-500` (CAD energy)
  - `from-emerald-500 to-teal-500` (educator/community)
  - `from-purple-500 to-fuchsia-500` (Coding energy)
  - `from-pink-500 to-rose-500` (extra accent option)

The avatar is auto-generated from the first letter of each word in `name`
(max 2 chars). No image upload required for launch.

### Recommended set

Aim for **3 quotes minimum** across the three cards (student, parent,
educator). If you have more than 3, pick the three with the strongest
quotes — keep the layout to 3 columns on desktop. If you want to ship 6,
let me know and I'll switch to a 2-row grid or carousel.

### Removing the section entirely

If you decide testimonials aren't right for launch, delete everything
between `TESTIMONIALS_START` and `TESTIMONIALS_END` (inclusive of those
markers) in `HomePage.tsx`.
