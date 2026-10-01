// Music section: turns the album list into a looping one-item Owl carousel with custom arrow icons
$(document).ready(function () {
    var musicflag = setInterval(function () {
        var $list = $(
            '#block-bartik-views-block-music-v1-block-4 .view-content .item-list ul');
        if ($list.length > 0 && $list.find('li').length > 0) {
            clearInterval(musicflag);
            $list.addClass("owl-carousel").owlCarousel({
                loop: true,
                nav: true,
                navText: [
                    '<span class="owl-nav-btn prev-btn"><img src="./Gojira _ Official Website_files/Icon_prev_mz6etgjl.svg" alt="left-arrow"/></span>',
                    '<span class="owl-nav-btn next-btn"><img src="./Gojira _ Official Website_files/Icon_next_yyeb4e3t.svg" alt="right-arrow"/></span>'
                ],
                responsive: {
                    0: {
                        margin: 30,
                        items: 1
                    },
                    1024: {
                        margin: 40,
                        items: 1
                    },
                }
            });
        }
    }, 100);
});
