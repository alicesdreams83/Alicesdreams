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


document.addEventListener(
    "pageContentLoaded",
    setupPortfolio
);