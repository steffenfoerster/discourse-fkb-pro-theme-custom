import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import { gt } from "truth-helpers";
import dIcon from "discourse/helpers/d-icon";
import number from "discourse/helpers/number";
import UserLink from "discourse/components/user-link";
import avatar from "discourse/helpers/avatar";
import formatDate from "discourse/helpers/format-date";
import dirSpan from "discourse/helpers/dir-span";
import i18n from "discourse-common/helpers/i18n";
import discourseTags from "discourse/helpers/discourse-tags";
import PluginOutlet from "discourse/components/plugin-outlet";


export default class TliMiddleSection extends Component {
  
  get topic() {
    return this.args.outletArgs.topic;
  }

  get topicBackgroundStyle() {
    return htmlSafe(`background-image: url(${this.topic.image_url})`);
  }

  <template>
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
      
      <div class="link-middle-line">
        <div class="topic-title">
          <a href={{this.topic.url}} class="topic-link">
            {{dirSpan this.topic.fancyTitle htmlSafe=true}}
          </a>
          <PluginOutlet @name="topic-list-after-title" />
          {{#if this.topic.featured_link}}
            {{! Featured link rendered by core }}
          {{/if}}
          {{#if this.args.outletArgs.showTopicPostBadges}}
            {{! Topic post badges rendered by core }}
          {{/if}}
          {{discourseTags this.topic mode="list" tagsForUser=this.args.outletArgs.tagsForUser}}
        </div>
        
        {{#if this.topic.image_url}}
          <a href={{this.topic.lastUnreadUrl}}>
            <div class="topic-image">
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

      <a href={{this.topic.summaryUrl}} class="num views">
        {{number this.topic.views numberKey="views_long"}} {{dIcon "far-eye"}}
      </a>
  
      {{#if this.topic.lastPosterUser}}
        <UserLink @user={{this.topic.lastPosterUser}} class="latest-poster-tlist">
          {{avatar this.topic.lastPosterUser imageSize="tiny"}}
        </UserLink>
      {{/if}}
  
      <a href={{this.topic.lastPostUrl}} class="latest-activity-tlist">
        {{formatDate this.topic.bumpedAt format="tiny" noTitle=true}} {{dIcon "clock-rotate-left"}}
      </a>
  
      <a href={{this.topic.lastUnreadUrl}} class="posts-map badge-posts" aria-label={{this.topic.title}}>
        <PluginOutlet @name="topic-list-before-reply-count" />
        {{number this.topic.replyCount noTitle=true}} {{dIcon "far-comment"}}
      </a>
    </div>
  </template>
}
