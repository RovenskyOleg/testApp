'use strict';

function Facade(cachedData, helper) {
    var init = function() {
        helper.setData(cachedData[0]);
        helper.cached(cachedData);
    };

    this.getResult = function(uri) {
        var self = this;
        $.get(uri, function(data) {            
            cachedData = data;
        })
        .done(function() {
            init();
        })
        .fail(function() {
            console.log( "error" );
        })
    }

    return this;
}