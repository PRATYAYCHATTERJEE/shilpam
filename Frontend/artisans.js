/* =========================================================
   SILPAM — ARTISANS PAGE JS
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ARTISAN DATA
    ===================================================== */

    const artisans = [

        {
            id: 1,
            name: "Gopal Pal",
            category: "terracotta",
            craft: "Terracotta Artisan",
            location: "Bishnupur, Bankura",
            district: "bankura",
            experience: 5,
            rating: 4.7,
            reviews: 120,
            description:
                "Keeping the rich tradition of terracotta art alive for generations.",
            image: "assets/bamboo/bamboo1.png"
        },


        {
            id: 2,
            name: "Maya Das",
            category: "bamboo",
            craft: "Bamboo Artisan",
            location: "Shantiniketan, Birbhum",
            district: "birbhum",
            experience: 18,
            rating: 4.9,
            reviews: 9,
            description:
                "Crafting beautiful bamboo products with skill and patience.",
            image: "images/artisans/maya-das.jpg"
        },


        {
            id: 3,
            name: "Haripada Saha",
            category: "dokhra",
            craft: "Dokra Artisan",
            location: "Dariapur, Purulia",
            district: "purulia",
            experience: 30,
            rating: 4.9,
            reviews: 150,
            description:
                "Preserving the ancient art of dokra craft with passion.",
            image: "images/artisans/haripada-saha.jpg"
        },


        {
            id: 4,
            name: "Sabita Roy",
            category: "textile",
            craft: "Kantha ",
            location: "Murshidabad, West Bengal",
            district: "murshidabad",
            experience: 15,
            rating: 4.8,
            reviews: 102,
            description:
                "Stitching stories with threads in every Kantha piece.",
            image: "images/artisans/sabita-roy.jpg"
        },


        {
            id: 5,
            name: "Rina Mondal",
            category: "woodcraft",
            craft: "Woodcraft Artisan",
            location: "Nadia, West Bengal",
            district: "nadia",
            experience: 20,
            rating: 4.6,
            reviews: 80,
            description:
                "Turning wood into timeless handcrafted masterpieces.",
            image: "images/artisans/rina-mondal.jpg"
        },


        {
            id: 6,
            name: "Purnima Karmakar",
            category: "jewellery",
            craft: "Jewellery Artisan",
            location: "Kolkata, West Bengal",
            district: "kolkata",
            experience: 12,
            rating: 4.7,
            reviews: 95,
            description:
                "Designing handcrafted jewellery inspired by tradition.",
            image: "images/artisans/purnima-karmakar.jpg"
        },


        {
            id: 7,
            name: "Lata Halder",
            category: "bamboo",
            craft: "Jute Artisan",
            location: "Hooghly, West Bengal",
            district: "hooghly",
            experience: 10,
            rating: 4.6,
            reviews: 70,
            description:
                "Eco-friendly jute creations for a better tomorrow.",
            image: "images/artisans/lata-halder.jpg"
        },


        {
            id: 8,
            name: "Anjali Chitrakar",
            category: "others",
            craft: "Folk Art Artisan",
            location: "Pingla, Paschim Medinipur",
            district: "paschim medinipur",
            experience: 16,
            rating: 4.8,
            reviews: 110,
            description:
                "Bringing Bengali folk art to life with vibrant colors.",
            image: "images/artisans/anjali-chitrakar.jpg"
        }

    ];



    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const grid =
        document.getElementById("artisanGrid");

    const tabs =
        document.querySelectorAll(".artisan-tab");

    const districtSelect =
        document.getElementById("artisanDistrict");

    const sortSelect =
        document.getElementById("artisanSort");



    /* =====================================================
       CURRENT FILTER
    ===================================================== */

    let currentCategory = "all";



    /* =====================================================
       RENDER ARTISANS
    ===================================================== */

    function renderArtisans() {

        let filteredArtisans =
            [...artisans];


        /* ---------------------------------------------
           CATEGORY FILTER
        --------------------------------------------- */

        if (currentCategory !== "all") {

            filteredArtisans =
                filteredArtisans.filter(
                    artisan =>
                        artisan.category === currentCategory
                );

        }



        /* ---------------------------------------------
           DISTRICT FILTER
        --------------------------------------------- */

        const district =
            districtSelect.value;


        if (district !== "all") {

            filteredArtisans =
                filteredArtisans.filter(
                    artisan =>
                        artisan.district === district
                );

        }



        /* ---------------------------------------------
           SORT
        --------------------------------------------- */

        const sort =
            sortSelect.value;


        if (sort === "experience") {

            filteredArtisans.sort(
                (a, b) =>
                    b.experience - a.experience
            );

        }


        else if (sort === "rating") {

            filteredArtisans.sort(
                (a, b) =>
                    b.rating - a.rating
            );

        }


        else if (sort === "name") {

            filteredArtisans.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

        }


        else {

            filteredArtisans.sort(
                (a, b) =>
                    b.rating - a.rating
            );

        }



        /* ---------------------------------------------
           EMPTY STATE
        --------------------------------------------- */

        if (filteredArtisans.length === 0) {

            grid.innerHTML = `

                <div class="artisan-empty">

                    <h3>
                        No artisans found
                    </h3>

                    <p>
                        Try another craft or district.
                    </p>

                </div>

            `;

            return;

        }



        /* ---------------------------------------------
           CREATE CARDS
        --------------------------------------------- */

        grid.innerHTML =
            filteredArtisans
                .map(createArtisanCard)
                .join("");


        attachCardEvents();

    }



    /* =====================================================
       CREATE CARD
    ===================================================== */

    function createArtisanCard(artisan) {

        return `

            <article
                class="artisan-card"
                data-category="${artisan.category}"
            >


                <!-- PHOTO -->

                <div class="artisan-card-photo">

                    <img
                        src="${artisan.image}"
                        alt="${artisan.name}"
                        loading="lazy"
                        onerror="this.src='images/artisans/default-artisan.jpg'"
                    >

                </div>



                <!-- CONTENT -->

                <div class="artisan-card-content">


                    <div class="artisan-card-top">

                        <span class="artisan-badge">
                            ${artisan.craft}
                        </span>


                        <button
                            class="artisan-heart"
                            type="button"
                            aria-label="Save artisan"
                        >
                            ♡
                        </button>

                    </div>



                    <h3>
                        ${artisan.name}
                    </h3>



                    <p class="artisan-location">

                        <span>⌖</span>

                        ${artisan.location}

                    </p>



                    <p class="artisan-description">

                        ${artisan.description}

                    </p>



                    <div class="artisan-card-bottom">


                        <div class="artisan-stats">


                            <div class="artisan-stat">

                                <strong>
                                    ${artisan.experience}+
                                </strong>

                                <span>
                                    Years Exp.
                                </span>

                            </div>


                            <div class="artisan-stat artisan-rating">

                                <strong>
                                    ${artisan.rating}
                                </strong>

                                <span>
                                    (${artisan.reviews} Reviews)
                                </span>

                            </div>


                        </div>



                        <button
                            class="artisan-profile-button"
                            type="button"
                            data-id="${artisan.id}"
                        >

                            View Profile

                        </button>


                    </div>


                </div>

            </article>

        `;

    }



    /* =====================================================
       CARD EVENTS
    ===================================================== */

    function attachCardEvents() {


        /* HEART */

        document
            .querySelectorAll(".artisan-heart")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        button.classList.toggle("active");

                        button.textContent =
                            button.classList.contains("active")
                                ? "♥"
                                : "♡";

                    }
                );

            });



        /* PROFILE */

        document
            .querySelectorAll(".artisan-profile-button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(button.dataset.id);

                        const artisan =
                            artisans.find(
                                item =>
                                    item.id === id
                            );


                        if (!artisan) return;


                        /*
                           Later replace this with:

                           window.location.href =
                           `artisan-profile.html?id=${artisan.id}`;

                        */

                        console.log(
                            "Selected artisan:",
                            artisan
                        );

                    }
                );

            });

    }



    /* =====================================================
       CATEGORY TABS
    ===================================================== */

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {


                tabs.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                tab.classList.add(
                    "active"
                );


                currentCategory =
                    tab.dataset.category;


                renderArtisans();

            }
        );

    });



    /* =====================================================
       DISTRICT
    ===================================================== */

    districtSelect.addEventListener(
        "change",
        renderArtisans
    );



    /* =====================================================
       SORT
    ===================================================== */

    sortSelect.addEventListener(
        "change",
        renderArtisans
    );



    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    renderArtisans();

});