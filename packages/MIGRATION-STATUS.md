# Platform Migration — Status & Open Issues

Shared design-system/platform packages under `packages/` (`@kozydozy/*`), and the
migration of the four apps onto them.

## Package status (all typecheck green, consumed as source via alias)

| Package | Purpose |
|---|---|
| `@kozydozy/tokens` | design tokens + per-brand presets |
| `@kozydozy/theme` | styled-components `PlatformTheme`, `createTheme`, `GlobalStyle` |
| `@kozydozy/ui` | ~35 UI primitives + `Skeleton` + toast/spinner config |
| `@kozydozy/forms` | Formik field components |
| `@kozydozy/shared` | app-agnostic helpers (incl. AuthorityCheck/AdaptableCard/DoubleSidedImage/Chart) |
| `@kozydozy/foundation` | store base (auth/base/locale/theme slices + `FoundationState`), hooks, constants/configs/types |
| `@kozydozy/routing` | route guards (Protected/Public/AuthorityGuard) |
| `@kozydozy/layout` | Theme/ModeSwitcher/Notification/SideNavToggle/PageContainer |

## App migration status

| App | Status |
|---|---|
| **mk-equine** | ✅ Fully migrated (ui/forms/shared/theme/foundation/routing/layout). typecheck + build green. |
| **michelle-points** | ✅ Fully migrated. typecheck + build green. |
| **varsity-spotlight** | ✅ Fully migrated (ecom app: cart/compare/favorites/orders/players). typecheck + build green. |
| **nursery** | 🟡 In conversion. Phase 3a: styled foundation wired (coexists w/ Tailwind). Phase 3b: marketing shell (EcomLayout header/nav, AnnouncementBar, ecom Footer) + Home page rebuilt in styled-components (premium editorial). Phase 3c: Product Listing Page (Shop.tsx, ShopFilters.tsx, ProductCard.tsx) rebuilt in styled-components + `@kozydozy/ui` Button/Select/Input/Checkbox. Phase 3d: Product Detail Page (ProductDetailPage.tsx + Gallery/VariantButton/TabSection/Recommended, plus shared WishlistButton/ShareButton) rebuilt in styled-components + `@kozydozy/ui` Card/Button/Checkbox/Tabs/Notification/toast. Phase 3e: Cart page (Cart.tsx + CartAddOns.tsx) rebuilt in styled-components + `@kozydozy/ui` Card/Button (fulfillment selection, empty state, summary layout). `CartItems`/`OrderSummary` kept Tailwind (shared with out-of-scope Checkout/OrderConfirmation); `DeliveryCheckModal` unused/not rendered on cart. Checkout/admin/auth still Tailwind. |

`@kozydozy/tokens` now has presets for **all four** apps (`mkEquineTokens`,
`michellePointsTokens`, `varsitySpotlightTokens`, `nurseryTokens`).

### Nursery — Phase 3 remaining (after this foundation step)
Nursery is Tailwind; its `ui`/`FormElements`/`shared`/pages are className-based and are
NOT visually swappable for the styled-components packages without conversion. Remaining:
- Convert pages/components Tailwind → styled-components (page by page), then adopt
  `@kozydozy/ui`/`forms`/`shared` visual primitives.
- Compose the store with `foundationReducers` (like the other apps) + dedupe (already set up).
- Adopt routing/layout once pages are converted.
- Only then remove Tailwind config/CSS.
- Nursery's `StyledThemeProvider` uses a **minimal CSS-var-only GlobalStyle** (no body/typography)
  to avoid overriding Tailwind's base; the full `@kozydozy/theme` GlobalStyle applies once Tailwind is removed.
- Consider adding `babel-plugin-styled-components` to nursery's vite babel config when styled usage grows.

## Adoption recipe (proven on mk + michelle)
1. Alias `@kozydozy/*` to package `src` (tsconfig paths + vite alias) + subpaths.
2. Dedupe `react`/`react-dom`/`styled-components`/`react-redux`/`@reduxjs/toolkit`/`redux` (vite dedupe + tsconfig type-identity paths for the last three + styled-components).
3. `createTheme(<brand>Tokens)` + package `GlobalStyle`; delete local `styles/theme.ts`+`GlobalStyle.ts`; add `theme-augment.d.ts` (`import '@kozydozy/theme'`).
4. Bootstrap in `main.tsx`: `configureToastPortal(...)` + `configureSpinnerIcon(<BrandSpinnerIcon/>)`.
5. Compose store: `rootReducer` uses `{ ...foundationReducers, ...appSlices }`; `RootState = FoundationState & AppState`; `store/index` re-exports `@kozydozy/foundation`.
6. Re-point imports (path-only sed): ui/forms/shared/foundation subpaths, routing/layout.
7. Brand `[App].tsx` skeleton → `@kozydozy/ui/Skeleton`; de-brand DataTable props to `avatar*`.
8. Wire seams: `<ModeSwitcher onToggle={trackEvent}/>`, `<PageContainer footerSlot={<Footer/>}/>` (only where `footer` truthy).
9. Delete local duplicates; keep app-specific (brand shell, ecom/booking, admin views, DataTable, app configs/constants).

## Open issues / follow-ups

1. **No visual smoke tests yet** — mk-equine + michelle-points pass typecheck + build and preserve behavior by construction, but neither has been run in a browser. Recommend a manual pass (themed page, toast, spinner, route guards) before shipping each.
2. **`DataTable` + `loaders/TableRow` remain app-local** in every migrated app. Brand props are neutralized to generic `avatar*`, but the component itself is not extracted. A shared `@kozydozy/ui`/`shared` DataTable is the last non-trivial deferral (heavy TanStack config; low cross-app divergence).
3. **nursery (Tailwind)** is the biggest remaining task: convert its pages/components from Tailwind to styled-components + adopt the packages. Its Tailwind form fields / shared helpers are the replace targets.
4. **`MEG Points` naming cruft** in michelle-points (`APP_NAME`, CLAUDE.md still say "MEG Points"). Left untouched; clean up when convenient.
5. **michelle's sports-icon spinner is fork cruft** (a "family travel concierge" cycling *sports* icons). Preserved faithfully via `BrandSpinnerIcon`; consider replacing with an on-brand icon later.
6. **Alias-to-source consumption** — apps don't list `@kozydozy/*` in their `package.json` (they resolve via alias). Fine for build/typecheck; a future step could fold the apps into the root workspace for explicit dependency graphs.
7. **`declaration: false`** in `tsconfig.base.json` — correct while packages are consumed as source, but publishing to npm would require real declaration builds.
8. **Shared GA measurement ID** — analytics stays app-local; the known "all prod sites share one GA id" bug is not addressed by this work.
9. **Stays app-local by design:** `CartRoute` (ecom), `FormButton` (mk-only orphan), `StripeCardField` (nursery ecom), the branded template shell, admin view content.
