document.addEventListener("DOMContentLoaded", async function () {
    await loadComponent(
        "head_Placeholder",
        "head.html"
    );

    await loadComponent(
        "nav_Placeholder",
        "nav.html"
    );

    await loadComponent(
        "foot_Placeholder",
        "foot.html"
    );

const contentPlaceholder =
    document.getElementById("content_Placeholder");

if (contentPlaceholder) {
    const contentFile =
        contentPlaceholder.dataset.contentFile;

    if (contentFile) {
    await loadComponent(
        "content_Placeholder",
        contentFile
    );

    document.dispatchEvent(
        new CustomEvent("pageContentLoaded")
    );
}
}
    setupNav();
});


async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(
                "Could not load " + filePath
            );
        }

        const html = await response.text();

        const placeholder =
            document.getElementById(elementId);

        placeholder.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}


function setupNav() {
    const menuButton =
        document.getElementById("menu_Button");

    const closeMenuButton =
        document.getElementById("close_Menu_Button");

    const sideMenu =
        document.getElementById("side_Menu");

    if (!menuButton || !closeMenuButton || !sideMenu) {
        return;
    }

    menuButton.addEventListener("click", function () {
        sideMenu.classList.add("menu_Open");

        menuButton.setAttribute(
            "aria_expanded",
            "true"
        );
    });

    closeMenuButton.addEventListener("click", function () {
        sideMenu.classList.remove("menu_Open");

        menuButton.setAttribute(
            "aria_expanded",
            "false"
        );
    });
}