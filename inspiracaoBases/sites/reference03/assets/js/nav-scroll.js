// Navigation: smooth-scroll for #anchor menu links; ?musicsection=on / ?videossection=on deep links
document.addEventListener("DOMContentLoaded", function() {
    const isFrontPage = document.body.classList.contains("path-frontpage") ||
        document.body.classList.contains("frontpage") ||
        window.location.pathname === "/" ||
        window.location.pathname === "" ||
        new URLSearchParams(window.location.search).get("frontpage") === "true";
    if (!isFrontPage) {
        return;
    }
    const navLinks = document.querySelectorAll('.nav_menu_items a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Check if the link exists, starts with '#', and isn't JUST '#'
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault(); // Only stop the default click for internal anchors
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
jQuery(window).on("load", function() {
    const isFrontPage = document.body.classList.contains("path-frontpage") ||
        document.body.classList.contains("frontpage") ||
        window.location.pathname === "/" ||
        window.location.pathname === "" ||
        new URLSearchParams(window.location.search).get("frontpage") === "true";
    if (!isFrontPage) {
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("musicsection") === "on") {
        console.log("2");
        const musicLink = document.querySelector(".nav_menu_items a#music_nav");
        if (musicLink) {
            musicLink.click();
        }
    } else if (urlParams.get("videossection") === "on") {
        console.log("3");
        setTimeout(function() {
            const videoLink = document.querySelector(".nav_menu_items a#video_nav");
            if (videoLink) {
                videoLink.click();
            }
        }, 300);
    }
});
