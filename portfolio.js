function setupPortfolio() {
    const portfolioStars =
        document.querySelectorAll(".portfolio_Star");

    portfolioStars.forEach(function (star) {
        star.addEventListener("click", function () {
            const isOpen =
                star.classList.toggle("star_Open");

            star.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    });
}


/*
Runs after javascript_Template.js finishes
loading the portfolio content file.
*/

document.addEventListener(
    "pageContentLoaded",
    setupPortfolio
);