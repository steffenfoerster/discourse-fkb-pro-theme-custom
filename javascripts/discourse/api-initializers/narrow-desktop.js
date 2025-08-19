import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  // Set narrow desktop breakpoint without using container.lookup
  try {
    const NarrowDesktop = window.NarrowDesktop;
    if (NarrowDesktop) {
      NarrowDesktop.isNarrowDesktopView = (width) => {
        return width < 1000;
      };
    }
  } catch (e) {
    // Fail silently if NarrowDesktop is not available
  }
});
