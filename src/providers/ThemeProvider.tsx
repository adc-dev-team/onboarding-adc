"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wrapper sobre `next-themes` con la misma configuración que el
 * frontend principal (`adc-frontend-v2`):
 *  - `attribute="data-theme"` — coincide con los selectores
 *    `html[data-theme="dark"]` definidos en `globals.css`.
 *  - `defaultTheme="dark"` — el onboarding nació como pieza
 *    oscura (estética de cartel militar). Aunque el frontend
 *    principal usa "system", aquí preferimos arrancar siempre
 *    en oscuro porque es el look que el alumno asocia con la
 *    bienvenida. Un toggle permite cambiar a claro.
 *  - `enableSystem` — si el alumno marcó preferencia de sistema
 *    (light/dark), `next-themes` la respeta una vez que toca el
 *    toggle.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
