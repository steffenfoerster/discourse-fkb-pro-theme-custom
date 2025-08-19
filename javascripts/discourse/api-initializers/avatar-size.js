import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  let site;
  try {
    site = api.getCurrentUser()?.site;
    if (!site && api.container) {
      site = api.container.lookup("service:site");
    }
    if (!site && api.lookup) {
      site = api.lookup("service:site");
    }
  } catch (e) {
    // assume desktop if we can't determine
    site = { mobileView: false };
  }
  
  // Change avatar size on desktop
  if (site && !site.mobileView) {
    api.changeWidgetSetting("post-avatar", "size", 60);
  }
});
