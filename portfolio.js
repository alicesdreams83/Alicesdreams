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
                Begin closing:
                remove the open position,
                but keep the split halves visible.
                */

                star.classList.remove("star_Open");
                star.classList.add("star_Closing");

                star.setAttribute(
                    "aria-expanded",
                    "false"
                );

                /*
                After the halves finish moving,
                replace them with the solid star.
                */

                closingTimer = setTimeout(function () {
                    star.classList.remove(
                        "star_Closing"
                    );
                }, 400);
            }
            else {
                /*
                Open the star.
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
}


document.addEventListener(
    "pageContentLoaded",
    setupPortfolio
);