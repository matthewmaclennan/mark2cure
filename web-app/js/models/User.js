define(['backbone', 'vent',
        'cookie', 'hash'],

        function( Backbone, vent,
                  cookie, hash){
  'use strict';

  var UserObject = Backbone.Model.extend({
    url     : '/api/v1/user',
    defaults : {
      'username'    : 'User_'+ (''+hash( Date.now() )).substring(0,4),
      'email'       : '',
      'experience'  : 2,
      'created'     : '',

      'feedback_0' : -1,
      'feedback_1' : -1,
      'feedback_2' : -1,
      'feedback_3' : -1,

      'first_run'   : true,

      'advance'       : false,
      'sel_mode'      : "disease",

      'api_key'     : null
    },

    initialize : function() {
      if( this.isNew() ) {
        this.bind('change:api_key', this.changeAPIKey);
      }

      if( this.authenticated() ) {
        this.set('api_key', $.cookie('api_key'))
        this.fetch();
      } else {
        this.save();
      }
    },

    authenticated: function() {
      return Boolean( $.cookie('api_key') );
    },

    changeAPIKey : function () {
      $.cookie('api_key', this.get('api_key') );
      vent.trigger('userchanged', '');
    }

  });

  return new UserObject();
});
