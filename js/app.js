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

App.TopicRoute = Ember.Route.extend({
  model: function(params) {
    return Topics.findBy('id', params.topic_id);
  }
});
