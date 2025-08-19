import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const site = api.getCurrentUser()?.site || api.container?.lookup("service:site") || 
              api.lookup("service:site") || api.container?.lookup("site:main");
  
  // Change avatar size on desktop
  if (site && !site.mobileView) {
    api.changeWidgetSetting("post-avatar", "size", 60);
  }
});
