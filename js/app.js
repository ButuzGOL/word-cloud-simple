/* jshint indent: 2 */
/* jshint camelcase: false */
/* global Ember, App, Topics */

'use strict';

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('topics', { path: '/' }, function() {
    this.resource('topic', {
      path: 'topics/:topic_id'
    });
  });
});

App.TopicsRoute = Ember.Route.extend({
  model: function() {
    return Topics;
  }
});

App.TopicController = Ember.ObjectController.extend({
  volumes: {
    max: null,
    min: null
  },
  popularity: function() {
    var model,
        min, max, middle,
        minPoint = 1, maxPoint = 6,
        volume = this.get('volume'),
        popularity;

    if (!this.volumes.max || !this.volumes.min) {
      model = this.get('parentController.model');

      max = 0;
      min = model[0].volume;
      model.forEach(function(item) {
        var volume = item.volume;

        if (volume > max) {
          max = volume;
        }

        if (volume < min) {
          min = volume;
        }
      });
      this.volumes.max = max;
      this.volumes.min = min;
    } else {
      max = this.volumes.max;
      min = this.volumes.min;
    }

    middle = max - min;

    popularity = ((volume - min) / middle) * (maxPoint - minPoint) + minPoint;

    return 'font-size: ' + (popularity * 3 + 14) + 'px;';
  }.property('volume'),
  mood: function() {
    var sentimentScore = this.get('sentimentScore'),
        sentimentClassName;

    if (sentimentScore > 60) {
      sentimentClassName = 'green';
    } else if (sentimentScore < 40) {
      sentimentClassName = 'red';
    } else {
      sentimentClassName = 'grey';
    }

    return sentimentClassName;
  }.property('sentimentScore')
});

App.TopicRoute = Ember.Route.extend({
  model: function(params) {
    return Topics.findBy('id', params.topic_id);
  }
});

Ember.Handlebars.helper('undefined-to-zero', function(value) {
  return (typeof value === 'undefined') ? 0 : value;
});
