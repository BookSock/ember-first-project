import DS from 'ember-data';
import Config from '../config/environment';
import coerceId from "ember-data/-private/system/coerce-id";


export default DS.JSONSerializer.extend({
  // primaryKey: 'kind',
  // extractId(modelClass, resourceHash) {
  //   var id = Config.APP.startingId;
  //   Config.APP.startingId +=1;
  //
  //   return coerceId(id);
  // },
  // keyForAttribute: function(key) {
  //   if (key === 'data') {
  //       return 'datum';
  //   } else {
  //       return key;
  //   }
  // },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    var all_posts = payload.data.children //array of post
    delete payload.data.children
      var i
      for (i=0;i<Config.APP.post_limit;i++) {
        try {

          var parser = new DOMParser;
          var strr = all_posts[i].data.preview.images[0].resolutions[2].url
          var dom = parser.parseFromString(
              '<!doctype html><body>' + strr,
              'text/html');
          var decodedString = dom.body.textContent;

          var post_link = all_posts[i].data.permalink
          var dom2 = parser.parseFromString(
              '<!doctype html><body>' + post_link,
              'text/html');
          var link = "http://reddit.com" + dom2.body.textContent;
          store.createRecord('post', {
            permalink: link,
            imgurl: decodedString,
            over_18: all_posts[i].data.over_18,
            id: all_posts[i].data.id,
            Rid: Config.APP.startingId,
          })

        }
        catch(err) {
          //could create post records for posts that don't have
          //pictures here if I wanted to
          continue
        }
      }

    // var i
    // for (i=0;i<all_posts.length;i++) {
    //   store.createRecord('post', {
    //     permalink: all_posts[i].data.permalink,
    //     imgurl: DS.attr('string'),
    //     over_18: DS.attr('boolean'),
    //     id: imgurl: DS.attr('string'),
    //   })
    // }
    //
    var id = Config.APP.startingId;
    Config.APP.startingId +=1;

    var newPayload = {
      datum: payload.data,
      kind: payload.kind,
      //posts: [{post: {permalink: "JASON"}}, {post: {permalink: "not"}}],
      id: id,
    }


    return this._super(store, primaryModelClass, newPayload, id, requestType);
    // attrs: {
    //   datum: 'data'
    // }
    // console.log(id)
    // const newPayload = {
    //   id,
    //   data: payload.data,
    // };
    // return this._super(store, primaryModelClass, newPayload, id, requestType);
    // return {
    //   "posts": payload,
    //   "data": null,
    // }
  //   //this updates the two links we care about to remove the http
  //   //encode that reddit does in its API. Then changes JSON values
  //   var json = payload;
  //   console.log({
  //     "data": payload,
  //   })
  //   id = 99999
  //   console.log(id);
  //   return {
  //     "datum": payload.data,
  //     "kind": payload.kind,
  //     "id": id,
  //     "data": null,
  //   }
  //
  //
  //
  //   var i
  //   for (i=0;i<Config.APP.post_limit;i++) {
  //     try {
  //
  //       var parser = new DOMParser;
  //       var strr = json.data.children[i].data.preview.images[0].resolutions[1].url
  //       var dom = parser.parseFromString(
  //           '<!doctype html><body>' + strr,
  //           'text/html');
  //       var decodedString = dom.body.textContent;
  //
  //       var post_link = json.data.children[i].data.permalink
  //       var dom2 = parser.parseFromString(
  //           '<!doctype html><body>' + post_link,
  //           'text/html');
  //       var link = "http://reddit.com" + dom2.body.textContent;
  //       json.data.children[i].data.preview.images[0].resolutions[1].url = decodedString
  //       json.data.children[i].data.permalink = link
  //     }
  //     catch(err) {
  //       continue
  //     }
  //
  //
  //
  //
  //   }
  //   payload = json
  //   console.log(json)
  //
  //   return {
  //     "data": json,
  //     "id": "999998"
  //   }
  //
  //
  //
  //
  }
});
