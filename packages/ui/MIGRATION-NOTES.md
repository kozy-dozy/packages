# @kozydozy/ui — Migration Notes

## What this package is

The shared styled-components UI primitive library (~35 components + form/toast infra),
extracted from MK Equine and Michelle Points, which already shared **151 of 153** `ui/`
files byte-for-byte.

> **Phase 1b additions (non-breaking):** the package now declares **subpath exports**
> (`@kozydozy/ui/Form`, `/Input`, `/Select`, `/Checkbox`, `/Avatar`, `/Upload`,
> `/Button`, `/Dialog`, `/Tag`, `/Spinner`) so `@kozydozy/forms` and
> `@kozydozy/shared` could adopt it with path-only import rewrites, and the barrel
> now re-exports the generic `CommonProps` / `TypeAttributes` / `ColorLevel` /
> `StepStatus` types (identical to the apps' `@/@types/common`).

## Extraction base

The tree was copied from `mk-equine/react/src/components/ui/` (157 files). Only the items
below were changed; everything else is **verbatim** and already compiled in-app.

## Changes made during extraction

### 1. App decoupling — the only external imports the library had
The vendored `ui/` reached outside itself in exactly three places. All are now removed:

| File | Was | Now |
|---|---|---|
| `Table/Sorter.tsx` | `import type { SportsTheme } from '@/styles/theme'` | `import type { PlatformTheme } from '@kozydozy/theme'` |
| `toast/ToastWrapper.tsx` | `import store from '@/store'` + `import { lightTheme, darkTheme } from '@/styles/theme'` | Removed; replaced by an injectable portal wrapper (below). |

### 2. Toast portal is now injectable (`toast/toastPortalConfig.ts`)
The toast renders into a **detached** React root, so it needs the app to re-establish
context (Redux store, ThemeProvider). Previously it hard-imported the app's store and
themes. Now the app registers that context once at bootstrap:

```ts
import { configureToastPortal } from '@kozydozy/ui'
configureToastPortal((node) => (
  <Provider store={store}>
    <ThemeProvider theme={activeTheme}>{node}</ThemeProvider>
  </Provider>
))
```

**Phase 2 action:** each app must call `configureToastPortal` at startup to restore the
previous toast behaviour. Until then, toasts render with an identity wrapper (no app
context). This is the one behavioural seam introduced by extraction.

### 3. The 6 diverged files reconciled (no redesign)
MK Equine and Michelle Points differed in only these files:

| File | Nature of difference | Resolution |
|---|---|---|
| `Button/Button.tsx` | **Genuine brand design** (square/uppercase/flat vs pill/mixed-case/elevated) | **Tokenised** — reads `theme.components.button`. Each brand's tokens reproduce its current button exactly. |
| `Spinner/Spinner.tsx` | **Genuine brand design** (single horseshoe vs cycling sports icons) | **Tokenised values** (color/size/duration from `theme.components.spinner`) + **injectable `icon` prop**. See caveat below. |
| `CloseButton`, `Input`, `Form/FormItem` | Whitespace / var-rename / a 1-line margin drift — functionally identical | Kept the MK Equine version as canonical. `FormItem` keeps `margin-bottom: theme.spacing.md`; Michelle gains that 16px bottom margin on adoption (a spacing nicety, flag at migration). |
| `index.ts` | Brand export line | Brand component removed (below); barrel otherwise unchanged. |

### 4. Brand component generalised to `Skeleton`
The per-app "brand" component (`MkEquine` / `MichellePoints` / `VarsitySpotlight` /
`Nursery`) was byte-identical everywhere except its name and a CSS class prefix
(`mk-equine`, `meg-points`, …) that carried **no styling** in the styled apps. It is
in fact a loading **Skeleton** (sized block/circle placeholder), now shipped as
`@kozydozy/ui`'s `Skeleton` with generic `skeleton*` classes — no behavioural change.
Each app deletes its local brand copy on migration and points its DataTable loader
(`loaders/TableRow`) at `Skeleton`; DataTable's brand-named avatar props
(`mkEquineAvatarProps` → `avatarProps`) are de-branded at the same time.

### 5. One portability fix
`Dropdown/DropdownInnerMenu.tsx` used `// @ts-expect-error` on a framer-motion ref cast.
Once the package resolves its **own** dependency versions, that clash may not occur, which
makes an expect-error directive "unused" and fails the build. Switched to `// @ts-ignore`
(suppresses if present, silent if not) so the shared package tolerates version drift. No
runtime change.

## Spinner caveat (the one thing that isn't fully tokenisable)

A spinner **icon** is a React component, not a token. The shared `Spinner`:
- reads `color` / `size` / `duration` from `theme.components.spinner`,
- takes the brand icon via the `icon` prop (falls back to a neutral CSS ring).

MK Equine adopts it directly: `<Spinner icon={<GiHorseshoe />} />`.
**Michelle Points' animated multi-sport icon-cycler is different logic** (stateful, cycles
4 icons). It is *not* reproduced by the shared Spinner. At Michelle's migration, either
keep that cycler as a small app-local component, or add a shared `<SpinnerCycle>` wrapper
— a Phase 2 decision, called out here so it isn't a surprise.

## What was NOT changed

- No component's public API changed (except Button/Spinner gaining optional,
  backward-compatible props; Spinner keeps its `size` prop).
- No styling/behaviour changed for either brand once their tokens/icon are supplied.
- No app imports this package yet (Phase 2).

## Validated

`yarn typecheck` passes for all 157 files against a real install (react 19,
styled-components 6, @types/*).
