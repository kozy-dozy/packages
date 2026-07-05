# @kozydozy/forms — Migration Notes

## What this package is

The shared Formik-integrated form field components, extracted from the
styled-components apps. All 14 fields were **functionally identical** across
MK Equine, Michelle Points, and Varsity Spotlight (the only differences were
JSX attribute ordering and a comment typo). **Varsity Spotlight is the
canonical source** (clean base, a11y-clean variants).

## Files moved (14)

`BooleanSelectField`, `CheckboxField`, `CurrencyField`, `FileUploadField`,
`MultiSelectField`, `PasswordField`, `PasswordInput`, `RecaptchaField`,
`RichTextEditor`, `RichTextField`, `SelectField`, `TextField`,
`TextareaFIeld` (typo preserved to avoid breaking imports), plus `index.ts`.

> The public barrel mirrors the apps' original `FormElements/index.ts`
> (10 exports; `PasswordInput`/`RichTextEditor` are internal deps, `TextareaFIeld`
> was already commented out upstream). Behaviour preserved, not "fixed".

## Excluded (stay app-local)

- **`StripeCardField`** — exists only in Nursery (ecom/Stripe). Out of scope per
  the Phase 1b deferral list; belongs to a future ecom package.

## Changes made during extraction

- **Import rewrite (path-only):** `@/components/ui/X` → `@kozydozy/ui/X`. This is
  why `@kozydozy/ui` gained explicit **subpath exports** (`./Form`, `./Input`,
  `./Select`, `./Checkbox`, `./Avatar`, `./Upload`, …) — it lets us keep each
  file's exact default/named import shape instead of rewriting bindings.
- **`theme-augment.d.ts`:** a one-line `import '@kozydozy/theme'` that loads the
  styled-components `DefaultTheme` augmentation. Required because subpath imports
  of `@kozydozy/ui` don't transitively pull the theme types in.
- No component logic, props, or styling changed.

## Nursery equivalents to replace later (Phase 3)

Nursery has **Tailwind** versions of every one of these fields
(`BooleanSelectField … TextareaFIeld`, plus its own `StripeCardField`). Per the
long-term goal, Phase 3 **replaces Nursery's Tailwind form fields with these
shared styled-components components** — it does not preserve the Tailwind
versions. Do not copy Nursery's Tailwind fields into this package.

## Dependencies

- `@kozydozy/ui`, `@kozydozy/theme` (workspace)
- deps: `react-select`, `react-number-format`, `react-google-recaptcha`,
  `react-quill-new`, `react-icons`
- peers: `formik`, `react`, `react-dom`, `styled-components`

## Phase 2 adoption (per styled app)

```ts
// swap local imports:  '@/components/FormElements'  ->  '@kozydozy/forms'
import { TextField, SelectField } from '@kozydozy/forms'
```
Requires the app to already consume `@kozydozy/ui` + `@kozydozy/theme`. No app
is wired yet — that's Phase 2.

## Validated

`yarn typecheck` passes against a real install (React 19, styled-components 6,
Formik 2).
