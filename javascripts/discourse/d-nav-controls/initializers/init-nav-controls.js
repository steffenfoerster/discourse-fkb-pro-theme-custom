import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize() {
    console.log("FKB Theme: Navigation controls initializer loaded");
    // Temporarily disable to test basic loading
    /*
    withPluginApi("0.8.13", (api) => {
      // Only run on mobile - assume desktop if we can't determine
      const isMobile = window.innerWidth <= 768; // Basic mobile detection
      if (!isMobile) return;
            
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
    */
  },
};
