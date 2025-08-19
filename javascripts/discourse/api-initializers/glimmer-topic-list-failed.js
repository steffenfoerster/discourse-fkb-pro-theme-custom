import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {  
  const site = api.getCurrentUser()?.site || api.container?.lookup("service:site") || 
              api.lookup("service:site") || api.container?.lookup("site:main");

  if (!site || !site.useGlimmerTopicList) {
    document.body.classList.add("glimmer-topic-list-failed");
  }
});
