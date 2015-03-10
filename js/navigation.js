'use strict';

function Navigation(el, cachedData) {
    var cachedImg = [],
        settings = {
            position: 0            
        }; 

    this.cached = function(data) {
        cachedData = data;
    };

    this.setData = function(options) {    
        var data = options || {},
            classImg = (data.img).match(/([\w,\s-]+)\.[A-Za-z]{3}/)[1] || '';
           
        cachedImg.push(classImg);                     

        el.description.text(data.description);
        el.header.text(data.title);
        el.notes.text(data.note);

        el.image.addClass(classImg);

        if (cachedImg.length > 1) {
            el.image.removeClass(cachedImg[0]);
            cachedImg.shift();           
        }; 
    };

    var page = function() {
        var numberOfPage = cachedData.length;

        if (settings.position < 0) {
            settings.position = numberOfPage - 1;
        } else if (settings.position > (numberOfPage - 1)) {
            settings.position = 0;
        }
        return settings.position
    };

    this.goNext = function() {
        settings.position++;
        this.setData(cachedData[page()]);
    };

    this.goPrevious = function() {
        settings.position--;
        this.setData(cachedData[page()]);
    };

    this.fadeImg = function() {
        var animationName = 'custom-animated customFadeIn',
            animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        if(!el.showDetails.hasClass('close')) {
            el.image.addClass(animationName).one(animationEnd, function() {
                el.image.removeClass(animationName);
            });
        }
    };

    this.animate = function(element) {
        var animationName = 'custom-animated customFadeIn',
            animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        element.addClass(animationName).one(animationEnd, function() {
            element.removeClass(animationName);
        });
    };

    return this;
}