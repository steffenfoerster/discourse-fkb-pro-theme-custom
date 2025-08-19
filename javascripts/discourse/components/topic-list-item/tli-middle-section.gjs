import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import { gt } from "truth-helpers";
import concatClass from "discourse/helpers/concat-class";
import dIcon from "discourse/helpers/d-icon";
import number from "discourse/helpers/number";
import UserLink from "discourse/components/user-link";
import avatar from "discourse/helpers/avatar";
import formatDate from "discourse/helpers/format-date";
import dirSpan from "discourse/helpers/dir-span";
import replaceEmoji from "discourse/helpers/replace-emoji";
import i18n from "discourse-common/helpers/i18n";
import discourseTags from "discourse/helpers/discourse-tags";
import raw from "discourse/helpers/raw";
import PluginOutlet from "discourse/components/plugin-outlet";
import themeSetting from "discourse/helpers/theme-setting";

export default class TliMiddleSection extends Component {
  
  get topic() {
    return this.args.outletArgs.topic;
  }

  get topicBackgroundStyle() {
    return htmlSafe(`background-image: url(${this.topic.image_url})`);
  }

  <template>
    {{raw "topic-status" topic=this.topic}}

    <div class="tli-middle-section">
      {{#if this.topic.hasExcerpt}}
        <div class="topic-excerpt">
          <a href={{this.topic.url}} class="topic-excerpt-link">
            {{dirSpan this.topic.escapedExcerpt htmlSafe=true}}
            {{#if this.topic.excerptTruncated}}
              <span class="topic-excerpt-more">{{i18n "read_more"}}</span>
            {{/if}}
          </a>
        </div>
      {{/if}}
      <div id={{if this.topic.hasExcerpt "link-middle-line-excerpt" undefined}} class="link-middle-line">
        <div class="topic-title">
          <PluginOutlet @name="topic-list-after-title" />
          {{#if this.topic.featured_link}}
            {{raw "topic-featured-link" topic=this.topic}}
          {{/if}}
          {{#if this.args.outletArgs.showTopicPostBadges}}
            {{raw "topic-post-badges" unreadPosts=this.topic.unread_posts unseen=this.topic.unseen url=this.topic.lastUnreadUrl newDotText=this.args.outletArgs.newDotText}}
          {{/if}}
          {{discourseTags this.topic mode="list" tagsForUser=this.args.outletArgs.tagsForUser}}
        </div>
        {{#if this.topic.image_url}}
          <a href={{this.topic.lastUnreadUrl}}>
            <div class="topic-image">
              {{#if (themeSetting "topic_image_backdrop")}}
                <div class="topic-image__backdrop" style={{this.topicBackgroundStyle}} loading="lazy"></div>
              {{/if}}
              <img src={{this.topic.image_url}} class="topic-image__img" loading="lazy">
            </div>
          </a>
        {{/if}}
      </div>
    </div>
  
    <div class="tli-bottom-section">
      {{#if (gt this.topic.like_count 0)}}
        <a href={{this.topic.summaryUrl}} class="likes likes-tlist">
          {{number this.topic.like_count}}
          {{dIcon "heart"}}
        </a>
      {{/if}}

      <a href={{this.topic.summaryUrl}} class={{concatClass "num views" this.topic.viewsHeat}}>
        {{number this.topic.views numberKey="views_long"}} {{dIcon "far-eye"}}
      </a>
  
      <UserLink
        @user={{this.topic.lastPosterUser}}
        class="latest-poster-tlist"
      >
        {{avatar this.topic.lastPosterUser imageSize="tiny"}}
      </UserLink>
  
      <a 
        href={{this.topic.lastPostUrl}}
        class={{concatClass "latest-activity-tlist" this.topic.viewsHeat}}
      >
        {{formatDate this.topic.bumpedAt format="tiny" noTitle=true}} {{dIcon "clock-rotate-left"}}
      </a>
  
      <a 
        href={{this.topic.lastUnreadUrl}}
        class={{concatClass "posts-map badge-posts" this.topic.viewsHeat}}
        aria-label={{this.topic.title}}
      >
        <PluginOutlet @name="topic-list-before-reply-count" />
        {{number this.topic.replyCount noTitle=true}} {{dIcon "far-comment"}}
      </a>
    </div>
  </template>
}
