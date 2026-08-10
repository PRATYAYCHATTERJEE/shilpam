/* =========================================
   SILPAM — OPENING ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");

    /*
        Time before opening screen disappears.

        3000ms = 3 seconds
    */

    const introDuration = 3200;


    setTimeout(() => {

        intro.classList.add("hide");

        /*
            Allow the main website
            to scroll after intro finishes.
        */

        document.body.style.overflow = "auto";

    }, introDuration);

});

/* =========================================
   SILPAM NAVBAR
========================================= */

const mobileMenu = document.getElementById("mobileMenu");
const mobileNav = document.getElementById("mobileNav");

if (mobileMenu && mobileNav) {

    mobileMenu.addEventListener("click", () => {

        mobileNav.classList.toggle("show");

    });


    /* Close mobile menu after clicking a link */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("show");

        });

    });

}