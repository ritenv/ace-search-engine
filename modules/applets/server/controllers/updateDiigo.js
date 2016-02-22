var mongoose = require('mongoose');
var _ = require('lodash');
var Applet = mongoose.model('Applet');
var unirest = require('unirest');

module.exports = function(System) {
  var obj = {};
  var maxLimit = 20;

  obj.updateDiigo = function(cb) {
    var start = 0;
    save10linksRecursively(0, cb)
  }

  function save10linksRecursively(start, cb) {
    var encoded = new Buffer(System.config.diigo.username + ':' + System.config.diigo.password).toString('base64');
    unirest
      .get('https://secure.diigo.com/api/v2/bookmarks?start=' + start + '&count=100')
      .header('Accept', 'application/json')
      .header('Authorization', 'Basic ' + encoded)
      .timeout(3000)
      .end(function(response) {
        var links = response.body;
        if (links && links.length && start < maxLimit) {
          var elastic = System.plugins.elastic;
          links.map(function(link) {
            link.id = link.url; //ensure unique
            link.description = link.desc;
            link.docType = 'links';
            delete link.desc;

            elastic.upsert(link, function(err, response) {
              //nothing to log
            });
          });
          setTimeout(function() {
            save10linksRecursively(start + 100, cb);
          }, 2000);
        } else if (!links.length) {
          console.log('Diigo said:', response.body);
          cb();
        } else {
          cb();
        }
      });
  }
  
  return obj;
};