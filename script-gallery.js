var photos = [
    'img/gallery-picture/course_html_2_index-large.jpg',
    'img/gallery-picture/course_html_2_catalog-large.jpg',
    'img/gallery-picture/course_html_2_form-large.jpg',
    'img/gallery-picture/course_html_2_index_tablet-large.jpg',
    'img/gallery-picture/course_html_2_catalog_tablet-large.jpg',
    'img/gallery-picture/course_html_2_form_tablet-large.jpg',
    'img/gallery-picture/course_html_2_index_mobile-large.jpg',
    'img/gallery-picture/course_html_2_catalog_mobile-large.jpg',
    'img/gallery-picture/course_html_2_form_mobile-large.jpg',
];


var thumbnails = document.querySelectorAll('.view-gallery__photo-preview');
var fullPhoto = document.querySelector('.full-photo');

var addThumbnailClickHandler = function (thumbnail, photo) {
    thumbnail.addEventListener('click', function () {
        fullPhoto.src = photo;
    });
};

for (var i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], photos[i]);
}