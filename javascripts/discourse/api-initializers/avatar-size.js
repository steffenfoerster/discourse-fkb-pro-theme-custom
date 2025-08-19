import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  console.log("FKB Theme: Avatar size initializer loaded");
  // Widget overrides are deprecated in Discourse 3.5+
  // Avatar sizing is now handled by CSS or core components
});
