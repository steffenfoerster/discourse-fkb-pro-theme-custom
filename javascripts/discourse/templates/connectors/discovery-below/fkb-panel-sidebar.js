import { withPluginApi } from "discourse/lib/plugin-api";
import { ajax } from "discourse/lib/ajax";
import { getURLWithCDN } from "discourse-common/lib/get-url";

export default {
  setupComponent(attrs, component) {
    withPluginApi("0.8.7", (api) => {
      // Only run on desktop - assume desktop if we can't determine
      const isDesktop = window.innerWidth > 768; // Basic desktop detection
      if (isDesktop) {
        // only run for logged-in users
        const current = api.getCurrentUser();
        if (!current) return;

        const username = component.currentUser?.username;
        if (!username) return;

        ajax(`/u/${username}/summary.json`).then((result) => {
          component.set("userLikesReceived", result.user_summary.likes_received);
          component.set("userLikesGiven", result.user_summary.likes_given);
          component.set("userDayVisited", result.user_summary.days_visited);
          component.set("userTopicCount", result.user_summary.topic_count);
          component.set("userPostCount", result.user_summary.post_count);
          component.set("userTimeRead", result.user_summary.time_read);
          component.set("userBookmarkCount", result.user_summary.bookmark_count);
          component.set("userSolvedCount", result.user_summary.solved_count);
          component.set("userName", current.name);
          component.set("user", current.username);
        });

        ajax(`/u/${username}/card.json`).then((result) => {
          const userCardBg = result.user.card_background_upload_url;
          const stinkinBadges = [];
          if (result.badges) {
            result.badges.forEach((b) => stinkinBadges.push(b));
          }
          component.set(
            "userCardBg",
            `background-image: url(${getURLWithCDN(userCardBg)})`
          );
          component.set("stinkinBadges", stinkinBadges);
          component.set("allBadges", result.user.badge_count);
        });
      }
    });
  },
};
