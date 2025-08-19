import { apiInitializer } from "discourse/lib/api";
// Temporarily comment out imports to test basic loading
// import TliTopSection from "../components/topic-list-item/tli-top-section";
// import TliMiddleSection from "../components/topic-list-item/tli-middle-section";

export default apiInitializer("1.8.0", (api) => {
  console.log("FKB Theme: API initializer loaded successfully");
  
  // Temporarily disable all functionality to test basic loading
  /*
  // Assume Glimmer topic list is enabled in modern Discourse
  const useGlimmerTopicList = true;

  // Glimmer topic list is the default now
  if (useGlimmerTopicList) {
    if (!settings.disable_topic_list_modification) {
      api.registerValueTransformer("topic-list-item-mobile-layout", () => false);
    }

    api.registerValueTransformer("topic-list-columns", ({ value: columns }) => {
      if (!settings.disable_topic_list_modification) {
        columns.delete("posters");
        columns.delete("replies");
        columns.delete("views");
        columns.delete("activity");
      }
      return columns;
    });

    if (!settings.disable_topic_list_modification) {
      api.renderInOutlet("topic-list-before-link", TliTopSection);
      api.renderInOutlet("topic-list-main-link-bottom", TliMiddleSection);
    }
  }

  api.modifyClass("component:discovery/topics", (Superclass) =>
    class extends Superclass {
      get renderNewListHeaderControls() {
        return this.showTopicsAndRepliesToggle && !this.args?.bulkSelectEnabled;
      }
    }
  );
  */

  api.onPageChange(() => {
    const fkbHidden = localStorage.getItem("fkb_panel_hidden") === "true";
    const fkbVisible = localStorage.getItem("fkb_panel_hidden") === "false";
    const isHidden = document.body.classList.contains("fkb-panel-hidden");

    if (fkbHidden && !isHidden) {
      document.body.classList.add("fkb-panel-hidden");
    } else if (fkbVisible && isHidden) {
      document.body.classList.remove("fkb-panel-hidden");
    }
  });
});
