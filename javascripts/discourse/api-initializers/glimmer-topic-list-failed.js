import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {  
  const site = api.lookup("service:site");

  if (!site || !site.useGlimmerTopicList) {
    document.body.classList.add("glimmer-topic-list-failed");
  }
});
