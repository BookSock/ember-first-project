import DS from 'ember-data';

export default DS.Model.extend({
  permalink: DS.attr('string'),
  imgurl: DS.attr('string'),
  over_18: DS.attr('boolean'),
  post_chunk: DS.belongsTo('posts'),
  Rid: DS.attr(),
});
