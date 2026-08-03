function setupPortfolio() {
    const portfolioStars =
        document.querySelectorAll(".portfolio_Star");

    portfolioStars.forEach(function (star) {
        let closingTimer;

        star.addEventListener("click", function () {
            const isOpen =
                star.classList.contains("star_Open");

            clearTimeout(closingTimer);

            if (isOpen) {
                /*
                Begin closing the category.
                */

                star.classList.remove("star_Open");
                star.classList.add("star_Closing");

                star.setAttribute(
                    "aria-expanded",
                    "false"
                );

                /*
                Replace the split copies with
                the seamless star after closing.
                */

                closingTimer = setTimeout(function () {
                    star.classList.remove(
                        "star_Closing"
                    );
                }, 400);
            }
            else {
                /*
                Open the category.
                */

                star.classList.remove(
                    "star_Closing"
                );

                star.classList.add("star_Open");

                star.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        });
    });

    setupFilmstripControls();
    setupMediaViewer();
}


/*
Create scroll buttons for every filmstrip.
*/

function setupFilmstripControls() {
    const filmstrips =
        document.querySelectorAll(
            ".portfolio_Filmstrip"
        );

    filmstrips.forEach(function (filmstrip) {
        const track =
            filmstrip.querySelector(
                ".filmstrip_Track"
            );

        if (!track) {
            return;
        }

        /*
        Prevent duplicate buttons if the
        setup function runs more than once.
        */

        if (
            filmstrip.querySelector(
                ".filmstrip_Arrow"
            )
        ) {
            return;
        }

        const previousButton =
            document.createElement("button");

        previousButton.className =
            "filmstrip_Arrow filmstrip_Previous";

        previousButton.type = "button";

        previousButton.setAttribute(
            "aria-label",
            "Scroll projects left"
        );

        previousButton.innerHTML = "&#10094;";


        const nextButton =
            document.createElement("button");

        nextButton.className =
            "filmstrip_Arrow filmstrip_Next";

        nextButton.type = "button";

        nextButton.setAttribute(
            "aria-label",
            "Scroll projects right"
        );

        nextButton.innerHTML = "&#10095;";


        previousButton.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                event.stopPropagation();

                track.scrollBy({
                    left: -240,
                    behavior: "smooth"
                });
            }
        );


        nextButton.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                event.stopPropagation();

                track.scrollBy({
                    left: 240,
                    behavior: "smooth"
                });
            }
        );


        filmstrip.insertBefore(
            previousButton,
            track
        );

        filmstrip.appendChild(
            nextButton
        );
    });
}

/*
Open images and videos in the
large portfolio viewer.
*/

function setupMediaViewer() {
    const viewer =
        document.getElementById("media_Viewer");

    const mediaArea =
        document.getElementById("viewer_Media");

    const titleArea =
        document.getElementById(
            "media_Viewer_Title"
        );

    const categoryArea =
        document.getElementById(
            "viewer_Category"
        );

    const descriptionArea =
        document.getElementById(
            "viewer_Description"
        );

    const closeButton =
        document.getElementById("viewer_Close");

    const mediaCards =
        document.querySelectorAll(".media_Card");

    if (
        !viewer ||
        !mediaArea ||
        !titleArea ||
        !categoryArea ||
        !descriptionArea ||
        !closeButton
    ) {
        return;
    }


    /*
    Prevent duplicate event listeners.
    */

    if (viewer.dataset.viewerReady === "true") {
        return;
    }

    viewer.dataset.viewerReady = "true";

    let lastFocusedCard = null;


    mediaCards.forEach(function (card) {
        card.addEventListener(
            "click",
            function () {
                openViewer(card);
            }
        );
    });


    function openViewer(card) {
        const mediaType =
            card.dataset.mediaType || "image";

        const mediaSource =
            card.dataset.mediaSrc;

        const category =
            card.dataset.category || "Portfolio";

        const title =
            card.querySelector(
                ".card_Title"
            )?.textContent.trim()
            || "Portfolio Project";

        const description =
            card.querySelector(
                ".card_Description"
            )?.textContent.trim()
            || "";

        if (!mediaSource) {
            return;
        }

        lastFocusedCard = card;

        mediaArea.replaceChildren();

        let mediaElement;


        /*
        Create a video when the card
        uses data-media-type="video".
        */

        if (mediaType === "video") {
            mediaElement =
                document.createElement("video");

            mediaElement.src = mediaSource;
            mediaElement.controls = true;
            mediaElement.playsInline = true;
            mediaElement.preload = "metadata";

            const poster =
                card.dataset.mediaPoster;

            if (poster) {
                mediaElement.poster = poster;
            }
        }


        /*
        Otherwise create an image.
        */

        else {
            mediaElement =
                document.createElement("img");

            mediaElement.src = mediaSource;

            mediaElement.alt =
                card.querySelector(
                    ".card_Image img"
                )?.alt || title;
        }


        mediaArea.appendChild(mediaElement);

        titleArea.textContent = title;
        categoryArea.textContent = category;

        descriptionArea.textContent =
            description;

        document.body.classList.add(
            "viewer_Open"
        );

        viewer.showModal();
    }


    function closeViewer() {
        if (viewer.open) {
            viewer.close();
        }
    }


    closeButton.addEventListener(
        "click",
        closeViewer
    );


    /*
    Clicking the dark background
    closes the viewer.
    */

    viewer.addEventListener(
        "click",
        function (event) {
            if (event.target === viewer) {
                closeViewer();
            }
        }
    );


    /*
    Clear video or image content
    after the viewer closes.
    */

    viewer.addEventListener(
        "close",
        function () {
            mediaArea.replaceChildren();

            document.body.classList.remove(
                "viewer_Open"
            );

            if (lastFocusedCard) {
                lastFocusedCard.focus();
            }
        }
    );
}

document.addEventListener(
    "pageContentLoaded",
    setupPortfolio
);