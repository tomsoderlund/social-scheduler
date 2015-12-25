// Generated by CoffeeScript 1.6.3
(function() {
  var BufferAPI, parseBody, request;

  request = require('request');

  parseBody = function(err, resp, body, cb) {
    var e, obj;
    if (err != null) {
      return cb(err);
    }
    try {
      obj = JSON.parse(body);
    } catch (_error) {
      e = _error;
      console.log(body);
      return cb(e);
    }
    return cb(null, obj);
  };

  BufferAPI = (function() {
    function BufferAPI(access_token) {
      this.access_token = access_token;
      this.uri = "https://api.bufferapp.com/1";
      this.access_token_suffix = "access_token=" + this.access_token;
    }

    BufferAPI.prototype.getUserInfo = function(cb) {
      var url;
      url = "" + this.uri + "/user.json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getProfileInfo = function(cb) {
      var url;
      url = "" + this.uri + "/profiles.json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getLinks = function(link, cb) {
      var encodedLink, url;
      encodedLink = encodeURIComponent(link);
      url = "" + this.uri + "/links/shares.json?" + this.access_token_suffix + "&url=" + encodedLink;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getConfiguration = function(cb) {
      var url;
      url = "" + this.uri + "/info/configuration.json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getUpdate = function(update_id, cb) {
      var url;
      url = "" + this.uri + "/updates/" + update_id + ".json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getUpdateInteractions = function(update_id, cb) {
      var url;
      url = "" + this.uri + "/updates/" + update_id + "/interactions.json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getPendingUpdates = function(profile_id, cb) {
      var url;
      url = "" + this.uri + "/profiles/" + profile_id + "/updates/pending.json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.getSentUpdates = function(profile_id, cb) {
      var url;
      url = "" + this.uri + "/profiles/" + this.profile_id + "/updates/sent.json?" + this.access_token_suffix;
      return request.get(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.reorderUpdates = function(profile_id, parameters, cb) {
      var url;
      url = url = "" + this.uri + "/profiles/" + profile_id + "/updates/reorder.json?" + this.access_token_suffix;
      return request.post(url, {
        form: parameters
      }, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.shuffleUpdates = function(profile_id, parameters, cb) {
      var url;
      url = "" + this.uri + "/profiles/" + profile_id + "/updates/shuffle.json?" + this.access_token_suffix;
      return request.post(url, {
        form: parameters
      }, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.createUpdate = function(parameters, cb) {
      var url;
      url = "" + this.uri + "/updates/create.json?" + this.access_token_suffix;
      return request.post(url, {
        form: parameters
      }, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.editUpdate = function(update_id, parameters, cb) {
      var url;
      url = "" + this.uri + "/updates/" + update_id + "/update.json?" + this.access_token_suffix;
      return request.post(url, {
        form: parameters
      }, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.shareUpdate = function(update_id, cb) {
      var url;
      url = "" + this.uri + "/updates/" + update_id + "/share.json?" + this.access_token_suffix;
      return request.post(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.deleteUpdate = function(update_id, cb) {
      var url;
      url = "" + this.uri + "/updates/" + update_id + "/destroy.json?" + this.access_token_suffix;
      return request.post(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    BufferAPI.prototype.moveUpdateToTop = function(update_id, cb) {
      var url;
      url = "" + this.uri + "/updates/" + update_id + "/move_to_top.json?" + this.access_token_suffix;
      return request.post(url, function(err, resp, body) {
        return parseBody(err, resp, body, cb);
      });
    };

    return BufferAPI;

  })();

  module.exports = BufferAPI;

}).call(this);
