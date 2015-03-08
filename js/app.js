'use strict';

var myModule = function(options) {
    var params = options || {},
        cachedData = [],               

        el = {
            previous: $(options.previous),
            next: $(params.next),
            find: $(params.find),
            showDetails: $(params.showDetails),
            hideDetails: $(params.hideDetails),
            header: $(params.header),
            description: $(params.description),
            notes: $(params.notes),
            body: $(params.body),
            image: $(params.image),
            wrapper: $(params.wrapper)
        },

        helper = new Helper(el, cachedData),
        facade = new Facade(cachedData, helper),                      

        events = {
            previous: function() {
                helper.animate(el.wrapper);
                
                helper.goPrevious();

                helper.fadeImg();
            },

            next: function() {
                helper.animate(el.wrapper);

                helper.goNext();

                helper.fadeImg();
            },

            find: function() {
                console.warn('buy!');
            },

            showDetails: function() {
                if(!el.showDetails.hasClass('close')) {
                    el.showDetails.addClass('close');

                    el.image.removeClass('sprite-product image');
                    el.body.addClass('custom-body');
                    el.header.addClass('custom-header');
                    el.hideDetails.removeClass('close');
                    el.showDetails.hide();
                    el.hideDetails.show();      
                }
            },

            hideDetails: function() {
                if(!el.hideDetails.hasClass('close')) {
                    el.hideDetails.addClass('close');

                    el.body.removeClass('custom-body');
                    el.header.removeClass('custom-header');
                    el.image.addClass('sprite-product image'); 

                    el.showDetails.removeClass('close');
                    el.showDetails.show();
                    el.hideDetails.hide();                    
                }                
            },
        };      

    for (var key in el) {
        el[key].click(events[key]);
    }   

    return {
        // init: function() {
        //     helper.setData(cachedData[0]);
        // },
        
        // var self = this;
        // $.get('js/responce.json', function(data) {
        //     cachedData = data;
        // })
        // .done(function() {
        //     self.init();
        // })
        // .fail(function() {
        //     console.log( "error" );
        // })
        result: function() {
            facade.getResult('js/responce.json');
            
        }
    };
};

$(function() {
    var activeModule = new myModule({
        next: '.next',
        previous: '.previous',
        find: '.find',
        showDetails: '.show-details',
        hideDetails: '.hide-details',
        image: '.image',
        header: '.header',
        body: '.body',
        description: '.description',
        notes: '.note',
        wrapper: '.wrapper'
    });

    activeModule.result();
});