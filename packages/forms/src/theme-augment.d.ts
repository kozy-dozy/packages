// Loads the styled-components `DefaultTheme` augmentation from @kozydozy/theme
// into this package's compilation. Subpath imports of @kozydozy/ui (e.g.
// `@kozydozy/ui/Form`) don't transitively pull it in, so without this the
// `${({ theme }) => theme.colors...}` interpolations lose their types.
import '@kozydozy/theme'
