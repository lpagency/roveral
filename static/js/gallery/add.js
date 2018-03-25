var imagesArray = new Array(); //MODEL

var galleryAdd = function()
{
    var gallery_list_div = $("div#gallery-list");
    $("#gallery-input-image").hide();
    /*
    $("img#preview-image-holder").load(function()
    {
        //$("#preview-image-holder").attr("src", e.target.result);
        imagesArray.push($("#preview-image-holder").attr("src"));
        //var template = $(".gallery-template").html();
        gallery_list_div.html("");
        var i = 0;                            
        for(i; i < imagesArray.length; i++){
            var template = $(".gallery-template").html();
            template = template.replace(";;src;;", imagesArray[i]); 
            template = template.replace(";;index;;", i);          
            gallery_list_div.append( template );
            $("#gallery-input-image").val("");
        }
    });
    */
    $("#gallery-input-image").on("change", function(evt) {
        var files = evt.target.files;        
        var i = 0;
        for(i = 0; i < files.length; i++){
            var reader = new FileReader();
            reader.onload = function(e) {
                // self.fileLoaded(e);
                $("#preview-image-holder").attr("src", e.target.result);
                imagesArray.push($("#preview-image-holder").attr("src"));
                //var template = $(".gallery-template").html();
                gallery_list_div.html("");
                
                for (i = 0; i < imagesArray.length; i++) {
                    var template = $(".gallery-template").html();
                    template = template.replace(";;src;;", imagesArray[i]);
                    template = template.replace(";;index;;", i);
                    gallery_list_div.append(template);
                }
                $("#gallery-input-image").val("");
            }
            reader.readAsDataURL(this.files[i]);
        }
    });
    //To make template image clickables...
    gallery_list_div.delegate("i#image-remover", "click", function() {
        //ERASE IMAGE
        var array_size = imagesArray.length;
        if (array_size == 1) {
            imagesArray = new Array();
            gallery_list_div.html("");
        } else {
            var target_to_erase = parseInt(($(this).attr("index")));
            var auxArray = new Array();
            var i = 0;
            for (i; i < array_size; i++) {
                if (i != target_to_erase) {
                    auxArray.push(imagesArray[i]);
                }
            }
            imagesArray = auxArray;
            gallery_list_div.html("");
            for (i = 0; i < imagesArray.length; i++) {
                var template = $(".gallery-template").html();
                template = template.replace(";;src;;", auxArray[i]);
                template = template.replace(";;index;;", i);
                gallery_list_div.append(template);
            }
        }
        /*
        var model_size = imagesArray.length;
        if(model_size == 1){
            imagesArray = new Array();
        }
        */
        //alert("mas uno: " + (parseInt(($(this).attr("index"))) + 1) );
    });
    $("div#gallery-add-image-button").on("click", function() 
    {
        $("#gallery-input-image").trigger("click");
        /*
        var elim = 3;
        var auxArray = testArray.slice(0,elim - 1);
        var auxArray2 = testArray.slice(elim ,testArray.length);
        alert("full: " + JSON.stringify(testArray) + "  sliced: " + JSON.stringify(auxArray) + "  sliced2: " + JSON.stringify(auxArray2));
        testArray = auxArray;
        alert("equals: " + JSON.stringify(testArray) + "  length: " + testArray.length);
        */
    });
}

$(document).ajaxComplete(function()
{
    galleryAdd();
});

$(document).ready(function() 
{
    galleryAdd();
});