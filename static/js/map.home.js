$(document).ready(function()
{
    // $('.slider').tinycarousel();
    var base_url = 'https://apibodegas.loadingplay.com/',
    checkout_url = 'https://pay.loadingplay.com/';
    var app_public = 19;

    function isLocalHost() {
        return document.location.href.indexOf('localhost') != -1;
    }

    function isDevelopment() {
        return document.location.href.indexOf('ondev.today') != -1;
    }

    // configure for each enviroment
    if ( isLocalHost() ) 
    {
        base_url = 'https://apibodegas.loadingplay.com/';
        checkout_url = 'https://pay.loadingplay.com/';
        app_public = 19;
    } 
    else if ( isDevelopment() ) 
    {
        base_url = 'https://apibodegas.loadingplay.com/';
        checkout_url = 'https://pay.loadingplay.com/';
        app_public = 19;
    }

    var drawPoints = function(map, places)
    {
        var popup;

        for(var i in places)
        {
            var marker = new google.maps.Marker({
                position: places[i],
                map: map,
                title: i,
                icon: 'https://84static.loadingplay.com/static/images/0a0c162484bddc6fdb928cc9086d96e9_icono_.png'
            });

            google.maps.event.addListener(
                marker, 
                'click', 
                function()
                {
                    if(!popup)
                    {
                        popup = new google.maps.InfoWindow();
                    }

                    var note = this.title;

                    popup.setContent(note);
                    popup.open(map, this);

                    google.maps.event.addListener(marker, 'mouseover', function() {
                        this.setIcon('https://84static.loadingplay.com/static/images/0a0c162484bddc6fdb928cc9086d96e9_icono_.png');
                    });

                    google.maps.event.addListener(marker, 'mouseout', function(){
                        this.setIcon('https://84static.loadingplay.com/static/images/0a0c162484bddc6fdb928cc9086d96e9_icono_.png');
                    });

                    limits.extend(places[i]);
                });
        }
    };

    var loadPlaces = function(stores)
    {
        var places = [];
        for(var x=0;x<stores.stores.length;x++)
        {
            places[stores.stores[x].name+' - '+stores.stores[x].number+' '+stores.stores[x].street]=new google.maps.LatLng(stores.stores[x].latitude, stores.stores[x].longitude);
        }

        return places;
    };

    var storesLoaded = function(stores)
    {
        // init options
        var options = {
            scrollwheel: false,
            zoom: 15,
            center: new google.maps.LatLng(stores.stores[0]['latitude'], stores.stores[0]['longitude']),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // init map
        var map = new google.maps.Map(document.getElementById('map'), options);

        // init points
        var places = loadPlaces(stores);
        drawPoints(map, places);

    };

    $.ajax({
        url:base_url+"store/list/"+app_public+"/false",
        success: storesLoaded
    });
});
