import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  console.log("FKB Theme: Narrow desktop initializer loaded");
  // Set narrow desktop breakpoint without using container.lookup
  // Temporarily disabled to test basic loading
});
