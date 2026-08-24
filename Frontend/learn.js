/* =====================================================
   SILPAM — LEARN PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       CATEGORY BUTTONS
    ================================================= */

    const categoryButtons =
        document.querySelectorAll(".learn-category");


    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

        });

    });



    /* =================================================
       LESSON SEARCH
    ================================================= */

    const searchInput =
        document.getElementById("lessonSearch");

    const lessonCards =
        document.querySelectorAll(".lesson-card");


    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchValue =
                searchInput.value
                    .toLowerCase()
                    .trim();


            lessonCards.forEach(card => {

                const title =
                    card.dataset.title
                        ?.toLowerCase() || "";


                const content =
                    card.innerText
                        .toLowerCase();


                if (
                    title.includes(searchValue) ||
                    content.includes(searchValue)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }



    /* =================================================
       PLAY BUTTONS
    ================================================= */

    const playButtons =
        document.querySelectorAll(".play-button");


    playButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const card =
                button.closest(".lesson-card");


            const title =
                card.querySelector("h3")?.innerText
                || "Lesson";


            console.log(
                "Opening lesson:",
                title
            );


            /*
             * Later you can replace this with:
             *
             * window.location.href =
             * `lesson.html?lesson=${...}`;
             *
             */


            alert(
                `Opening: ${title}`
            );

        });

    });



    /* =================================================
       LEARNING PATH BUTTONS
    ================================================= */

    const pathButtons =
        document.querySelectorAll(".path-card > button");


    pathButtons.forEach(button => {

        button.addEventListener("click", () => {

            const path =
                button.closest(".path-card");


            const title =
                path.querySelector("h3")?.innerText
                || "Learning Path";


            console.log(
                "Selected learning path:",
                title
            );

        });

    });



    /* =================================================
       AI ASSISTANT
    ================================================= */

    const aiButton =
        document.getElementById("askAiButton");


    if (aiButton) {

        aiButton.addEventListener("click", () => {

            console.log(
                "Silpam AI Assistant opened"
            );


            alert(
                "Silpam AI Assistant will be available here."
            );

        });

    }



    /* =================================================
       NEWSLETTER
    ================================================= */

    const newsletterButton =
        document.querySelector(
            ".newsletter-input button"
        );


    if (newsletterButton) {

        newsletterButton.addEventListener(
            "click",
            () => {

                const input =
                    document.querySelector(
                        ".newsletter-input input"
                    );


                const email =
                    input.value.trim();


                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    return;

                }


                alert(
                    "Thank you for subscribing to Silpam!"
                );


                input.value = "";

            }
        );

    }



    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


});