import DS from 'ember-data';
import Config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  queryRecord(posts, type, query) {

    const url = `https://www.reddit.com/r/${query.subreddit}/${query.listing}/.json?limit=` + Config.APP.post_limit;
    //console.log(url)
    //console.log(Ember.$.getJSON(url))

    return Ember.$.getJSON(url)
  }
});
