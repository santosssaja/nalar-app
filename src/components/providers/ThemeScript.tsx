"use client";

import { useServerInsertedHTML } from "next/navigation";

/**
 * Synchronous Anti-FOUC (Flash of Unstyled Content) Script.
 * Runs in <head> before first browser paint to eliminate theme flickering on page refresh.
 * Uses Next.js `useServerInsertedHTML` so the script is injected into the server HTML stream
 * without rendering a `<script>` tag inside the client React component tree, preventing
 * React 19 "Encountered a script tag while rendering React component" warnings.
 */
const themeInitializerScript = `(function() {
  try {
    var stored = localStorage.getItem('nalar_a11y_prefs_v1');
    if (stored) {
      var prefs = JSON.parse(stored);
      if (prefs && prefs.theme) {
        document.documentElement.setAttribute('data-theme', prefs.theme);
        document.documentElement.setAttribute('data-high-contrast', String(prefs.theme === 'high-contrast'));
      }
      if (prefs && prefs.fontScale) {
        document.documentElement.setAttribute('data-font-scale', prefs.fontScale);
      }
    }
  } catch (e) {}
})();`;

export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitializerScript }}
    />
  ));
  return null;
}
