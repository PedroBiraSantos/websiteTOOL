// Video section: Owl carousel of thumbnails + click-to-play YouTube IFrame players (pauses others on slide change)
window.addEventListener("load", (event) => {
    $('div#block-bartik-views-block-video-v1-block-3 .view-content').addClass('owl-carousel');
    var $carousel = $("div#block-bartik-views-block-video-v1-block-3 .view-content.owl-carousel");
    if ($carousel.length && $.fn.owlCarousel) {
        $carousel.owlCarousel({
            margin: 30,
            loop: true,
            stagePadding: 0,
            autoplay: false,
            nav: true,
            dots: false,
            onTranslate: function () {
                stopAllVideos();
            },
            navText: [
                '<span class="owl-nav-btn prev-btn"><img src="./Gojira _ Official Website_files/Icon_prev_mz6etgjl.svg" alt="left-arrow"/></span>',
                '<span class="owl-nav-btn next-btn"><img src="./Gojira _ Official Website_files/Icon_next_yyeb4e3t.svg" alt="right-arrow"/></span>'
            ],
            onInitialized: function () {
                $carousel.css('opacity', 1);
            },
            responsive: {
                0: {
                    items: 1
                },
                1025: {
                    items: 1
                }
            }
        });
    }
    var Selector = {
        view: {
            ClassName: ".video-wrapper"
        },
        page: {
            ID: "div#block-bartik-views-block-video-v1-block-3"
        },
    };
    var ytPlayers = {};
    var player;
    $(document).on('click', Selector.page.ID + ' .video-play, ' + Selector.page.ID + ' .videoimage, ' + Selector
        .page.ID + ' .preplay',
        function (e) {
            e.preventDefault();
            e.stopPropagation(); // Blocks Owl Carousel from intercepting this click action
            var $videoWrapper = $(this).closest(Selector.view.ClassName);
            var $idElement = $videoWrapper.find(".video-embed-id");
            if (!$idElement.length) return;
            var youtubeID = $idElement.attr("video-id");
            if (youtubeID) {
                var $embedDiv = $videoWrapper.find(".video-embed");
                if ($embedDiv.length) {
                    $videoWrapper.find(".preplay, .videoimage").hide();
                    var playerDivId = "player-" + youtubeID;
                    $embedDiv.html('<div id="' + playerDivId + '"></div>');
                    formYoutubeAPIPlayer(playerDivId, youtubeID);
                }
            }
        });
    function formYoutubeAPIPlayer(playerID, youtubeID) {
        if (typeof YT !== "undefined" && YT.Player) {
            player = new YT.Player(playerID, {
                height: "540",
                width: "100%",
                videoId: youtubeID,
                host: "https://www.youtube-nocookie.com",
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'modestbranding': 1
                },
                events: {
                    onReady: playYTVideo,
                    onStateChange: typeof onPlayerStateChange === 'function' ? onPlayerStateChange :
                        null,
                },
            });
            ytPlayers[playerID] = player;
        } else {
            console.warn("YouTube Iframe API is not loaded yet on this page context.");
        }
    }
    function playYTVideo(event) {
        stopAllVideos();
        event.target.playVideo();
    }
    function stopAllVideos() {
        for (let key in ytPlayers) {
            if (ytPlayers[key] && typeof ytPlayers[key].pauseVideo === "function") {
                ytPlayers[key].pauseVideo();
            }
        }
    }
});
