import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  // Widget overrides are deprecated in Discourse 3.5+
  // Avatar sizing is now handled by CSS or core components
  
  // Uncomment below if you need custom avatar sizing via CSS
  // api.onPageChange(() => {
  //   document.documentElement.style.setProperty('--avatar-size-large', '60px');
  // });
});
