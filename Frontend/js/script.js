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

/* =========================================
   SILPAM HERO SLIDER
========================================= */

const heroTrack = document.getElementById("heroTrack");
const heroDots = document.querySelectorAll(".hero-dot");

let currentHeroSlide = 0;

const totalHeroSlides = 5;

let heroTimer;


/* =========================================
   MOVE TO SLIDE
========================================= */

function moveHeroSlide(index) {

    if (index >= totalHeroSlides) {
        currentHeroSlide = 0;
    } 
    else if (index < 0) {
        currentHeroSlide = totalHeroSlides - 1;
    } 
    else {
        currentHeroSlide = index;
    }


    const offset =
        currentHeroSlide * 100;


    heroTrack.style.transform =
        `translateX(-${offset}%)`;


    updateHeroDots();

}


/* =========================================
   UPDATE DOTS
========================================= */

function updateHeroDots() {

    heroDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentHeroSlide
        );

    });

}


/* =========================================
   AUTOMATIC SLIDER
========================================= */

function startHeroSlider() {

    heroTimer = setInterval(() => {

        moveHeroSlide(currentHeroSlide + 1);

    }, 5000);

}


/* =========================================
   RESET TIMER
========================================= */

function resetHeroSlider() {

    clearInterval(heroTimer);

    startHeroSlider();

}


/* =========================================
   DOT CLICK
========================================= */

heroDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slideIndex =
            Number(dot.dataset.slide);

        moveHeroSlide(slideIndex);

        resetHeroSlider();

    });

});


/* =========================================
   START
========================================= */

if (heroTrack) {

    startHeroSlider();

}


/* =========================================
   SILPAM CRAFT CATEGORY TABS
========================================= */

const craftTabs =
    document.querySelectorAll(".craft-tab");


craftTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        /* Remove active state */

        craftTabs.forEach(item => {
            item.classList.remove("active");
        });


        /* Add active state */

        tab.classList.add("active");


        /* Get selected category */

        const category =
            tab.dataset.category;


        console.log(
            `Silpam category selected: ${category}`
        );

    });

});



