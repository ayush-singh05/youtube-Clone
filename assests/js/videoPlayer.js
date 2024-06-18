window.addEventListener("load", () => {
    let videoId = "";
    let cookieName = "videoObject";
    let cookies = document.cookie.split(';');

    let cookieValue = null;
    cookies.forEach(function (cookie) {
        let trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith(cookieName + '=')) {
            cookieValue = decodeURIComponent(trimmedCookie.substring(cookieName.length + 1));
        }
    });
    if (cookieValue !== null) {
        try {
            let videoObject = JSON.parse(cookieValue);
            videoId = videoObject.videoId;
            document.getElementById("playing-video-title").innerText = videoObject.title;
            document.getElementById("desc").innerText = videoObject.description;
            console.log(videoId);
        } catch (error) {
            console.error(error);
        }
    }
    if (YT) {
        new YT.Player("player", {
            height: "500",
            width: "1000",
            videoId,
            events: {
                'onReady': onPlayerReady
            }
        });

        function onPlayerReady(event) {
            event.target.playVideo();
        }
    }
})
