'use strict';

function Facade(cachedData, nav) {
    var init = function() {
        nav.setData(cachedData[0]);
        nav.cached(cachedData);
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