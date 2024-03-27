let upButton = document.querySelector('.up-button');

window.onscroll = function () {
    if (window.pageYOffset > 100) {
        upButton.classList.add('shown');
    } else {
        upButton.classList.remove('shown');
    }
};

upButton.onclick = function () {
    window.scrollTo(500, 0);
};