import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize() {
    withPluginApi("0.8.13", (api) => {
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
      if (!site || !site.mobileView) return;
            
      let scrollTop = window.scrollY;
      const body = document.body;
      const scrollMax = 0;
      let lastScrollTop = 0;
      const hiddenNavClass = "nav-controls-hidden";

      const add_class_on_scroll = () => body.classList.add(hiddenNavClass);
      const remove_class_on_scroll = () => body.classList.remove(hiddenNavClass);

      window.addEventListener('scroll', function() { 
        scrollTop = window.scrollY;
        if (
          lastScrollTop < scrollTop &&
          scrollTop > scrollMax &&
          !body.classList.contains(hiddenNavClass)
        ) { 
          add_class_on_scroll();
        } else if (
          lastScrollTop > scrollTop &&
          body.classList.contains(hiddenNavClass)
        ) { 
          remove_class_on_scroll();
        }
        lastScrollTop = scrollTop;
      });
    });
  },
};
