import Ember from 'ember';
import Config from '../config/environment';


export default Ember.Route.extend({
  // setupController(controller, model) {
  //   subreddit: "earthporn",
  //   this._super(...arguments);
  // },
  actions: {
        new_subreddit:  function(new_subreddit) {
          Config.APP.new_subreddit = new_subreddit
          //this.set('model', )

          //this.get('posts').destroyRecord()
          this.get('store').peekAll('post', Config.APP.startingId - 1).forEach( (post) => {
            //console.log(post.permalink)
            post.destroyRecord()
          })
          this.get('store').peekRecord('posts', Config.APP.startingId - 1).destroyRecord()
          this.refresh()

        }
    },
  model() {
    return this.get('store').queryRecord('posts', {
      subreddit: Config.APP.new_subreddit,
      listing: "hot",
    })
    .then((record) => {
      var post = this.get('store').peekAll('post')
      // post.forEach(record.get('posts').pushObject())
      var i
      //console.log(record)
      post=post.toArray()
      //console.log(post[i])
      for (i=0;i<post.length;i++){
        //console.log(post[i].Rid)
        //console.log(post[i])
        if (post[i].Rid == record.id) {
          record.get('posts').pushObject(post[i])

        }
        record.get('posts').pushObject(post[i])


      }
      return record
    })
    // .catch((error) => {
    //   console.log(error.message);
    // })


      //debugger;
  }
})

    //return 'hi'
  //   var dataObj = Ember.Object.extend({
  //     after: null,
  //     postupdate: [],
  //     posts: Ember.computed('postupdate', function() {
  //       return this.get('postupdate')
  //     }),
  //   });
  //   let data=dataObj.create()
  //   var limit = 100
  //   return Ember.$.ajax({
  //           url: 'https://www.reddit.com/r/earthporn/hot/.json?limit='+limit.toString(),
  //           // your other details...
  //       }).then(function(resolve) {
  //         //console.log(resolve.data.children[0].data.preview.images[0].source.url)
  //
  //         var i
  //         for (i=0;i<limit;i++) {
  //           try {
  //             if (resolve.data.children[i].data.over_18 == true) {
  //               throw new Error
  //             }
  //             var parser = new DOMParser;
  //             var strr = resolve.data.children[i].data.preview.images[0].resolutions[1].url
  //             var dom = parser.parseFromString(
  //                 '<!doctype html><body>' + strr,
  //                 'text/html');
  //             var decodedString = dom.body.textContent;
  //
  //             var post_link = resolve.data.children[i].data.permalink
  //             var dom2 = parser.parseFromString(
  //                 '<!doctype html><body>' + post_link,
  //                 'text/html');
  //             var link = "http://reddit.com" + dom2.body.textContent;
  //
  //             data.postupdate.push({"imgurl": decodedString, "link": link})
  //           }
  //           catch(err) {
  //             continue
  //           }
  //
  //
  //
  //
  //         }
  //         data.after=resolve.data.after
  //         // console.log("ajax below")
  //         // console.log(data.postupdate)
  //         // console.log(data.posts[1])
  //         console.log(data.get('posts'))
  //           //data=resolve.data.children[0].data.preview.images[0].source.url;
  //           // process the result...
  //           // console.log(data)
  //           //
  //           //
  //           // console.log(data[0])
  //           // for (i=0;i<limit;i++) {
  //           //   data2[i]=data[i]
  //           //   console.log(data2[i])
  //           // }
  //           // console.log(data)
  //           // var cars = ["Saab", "Volvo", "BMW"];
  //           // console.log(typeof(cars))
  //           //return data.get('posts');
  //
  //
  //           return data.postupdate;
  //       });
  //
  //   //return ["https://i.redditmedia.com/XcJYy6TuijtMBzXz0da6CwON9R65uVM02Qijy-43YNU.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=ae7775ae24f469c1123dd6b95121d287", "https://i.redditmedia.com/XcJYy6TuijtMBzXz0da6CwON9R65uVM02Qijy-43YNU.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=ae7775ae24f469c1123dd6b95121d287"]
  //   //console.log(data.get('posts'))
  //   //return[1,2]
  //   return data.get('posts');
//    }
// });
