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
    // assume glimmer topic list is enabled if we can't determine
    site = { useGlimmerTopicList: true };
  }

  if (!site || !site.useGlimmerTopicList) {
    document.body.classList.add("glimmer-topic-list-failed");
  }
});
