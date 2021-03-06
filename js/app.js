'use strict';

var advertisingContent = function(options) {
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

        navigation = new Navigation(el, cachedData),
        facade = new Facade(cachedData, navigation),                      

        events = {
            previous: function() {
                navigation.animate(el.wrapper);
                
                navigation.goPrevious();

                navigation.fadeImg();
            },

            next: function() {
                navigation.animate(el.wrapper);

                navigation.goNext();

                navigation.fadeImg();
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
                    

                    setTimeout(function() {
                          el.image.addClass('sprite-product image');
                          el.header.removeClass('custom-header'); 
                    }, 800);                    

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
        result: function() {
            facade.getResult('js/responce.json');
            
        }
    };
};

$(function() {
    var content = new advertisingContent({
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

    content.result();
});