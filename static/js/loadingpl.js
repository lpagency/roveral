//lleva a div dentro de pagina
anchor = {
    init: function() {
        $("a.anchorLink").click(function() {
            elementClick = $(this).attr("href");
            console.log(elementClick);
            destination = $(elementClick).offset().top;
            console.log(destination);
            $("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination
            },800);
            return false;
        });
    }
}


$(document).ready(function() 
{

    anchor.init();

});