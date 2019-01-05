$(function () {
    var preloader = $('#preloader');

    $(document).ajaxStart(function () {
        preloader.show();
    });
    $(document).ajaxStop(function () {
        preloader.hide();
    });
    var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=nyPqi8jwpWY5L2hfeWPxwSAz9p3tJu1Dv0VkWsXe";
    var i;

    $.get(url, function (response) {
        var galleryDiv = $('<div id="gallery" style="display:none;">)');
        var mainDiv = $('body').append(galleryDiv);
        for (i = 0; i < response.photos.length; i++) {
            var obj = response.photos[i];
            var picName = obj.camera.full_name;
            var picDate = obj.earth_date;
            var picUrl = obj.img_src;
            var img = $('<img alt="' + picDate + '" src="' + picUrl + '" data-image="' + picUrl + '" data-description="' + picName + '" >');
            $('#gallery').append(img);
        }
        jQuery("#gallery").unitegallery();
    });
});