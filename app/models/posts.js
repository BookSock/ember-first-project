import DS from 'ember-data';

export default DS.Model.extend({
  kind: DS.attr(),
  datum: DS.attr(),
  posts:DS.hasMany('post')

  // after: DS.attr('string'),
  // posts: DS.attr(),
  // datum: DS.attr()

});
