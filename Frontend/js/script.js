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


/* =========================================
   SILPAM CRAFT CATEGORY TABS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const craftTabs = document.querySelectorAll(".craft-tab");

    console.log("Craft tabs found:", craftTabs.length);

    craftTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            console.log("TAB CLICKED:", tab.dataset.category);

            /* Remove active from all tabs */
            craftTabs.forEach(item => {
                item.classList.remove("active");
            });

            /* Add active to clicked tab */
            tab.classList.add("active");

            /* Selected category */
            const category = tab.dataset.category;
if (category === "all") {

    renderCategoryProducts(allCrafts);

}

else if (category === "terracotta") {

    renderCategoryProducts(terracotta);

}
            console.log("Selected category:", category);

        });

    });

});





/* =========================================
   SILPAM — CATEGORY PRODUCTS
========================================= */

const categoryProducts =
    document.getElementById("categoryProducts");


function renderCategoryProducts(products) {

    if (!categoryProducts) {
        console.error("categoryProducts container not found");
        return;
    }


    categoryProducts.innerHTML = "";


    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "category-product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <span class="product-price">
                        ${product.price}
                    </span>

                    <button class="product-view">
                        View →
                    </button>

                </div>

            </div>

        `;


        categoryProducts.appendChild(card);

    });

}


/* =========================================
   DEFAULT CATEGORY
========================================= */

renderCategoryProducts(allCrafts);