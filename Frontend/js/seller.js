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
   SILPAM SELLER PAGE JAVASCRIPT
========================================= */


/* =========================================
   WAIT FOR PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================
           MOBILE NAVIGATION
        ====================================== */

        const mobileMenu =
            document.getElementById("mobileMenu");

        const mobileNav =
            document.getElementById("mobileNav");


        if (mobileMenu && mobileNav) {

            mobileMenu.addEventListener(
                "click",
                () => {

                    mobileNav.classList.toggle(
                        "show"
                    );

                }
            );


            /* Close mobile menu after link click */

            const mobileLinks =
                mobileNav.querySelectorAll("a");


            mobileLinks.forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        () => {

                            mobileNav.classList.remove(
                                "show"
                            );

                        }
                    );

                }
            );

        }



        /* =====================================
           PRODUCT IMAGE UPLOAD
        ====================================== */

        const photoInput =
            document.getElementById(
                "productPhotos"
            );


        const uploadBox =
            document.querySelector(
                ".upload-box"
            );


        if (photoInput && uploadBox) {

            photoInput.addEventListener(
                "change",
                () => {

                    const files =
                        photoInput.files;


                    if (!files.length) {

                        return;

                    }


                    const text =
                        uploadBox.querySelector(
                            "strong"
                        );


                    if (text) {

                        text.textContent =
                            `${files.length} photo${
                                files.length > 1
                                    ? "s"
                                    : ""
                            } selected`;

                    }

                }
            );


            /* =================================
               DRAG & DROP
            ================================== */

            uploadBox.addEventListener(
                "dragover",
                (event) => {

                    event.preventDefault();

                    uploadBox.classList.add(
                        "dragging"
                    );

                }
            );


            uploadBox.addEventListener(
                "dragleave",
                () => {

                    uploadBox.classList.remove(
                        "dragging"
                    );

                }
            );


            uploadBox.addEventListener(
                "drop",
                (event) => {

                    event.preventDefault();

                    uploadBox.classList.remove(
                        "dragging"
                    );


                    const files =
                        event.dataTransfer.files;


                    if (files.length) {

                        photoInput.files =
                            files;


                        const text =
                            uploadBox.querySelector(
                                "strong"
                            );


                        if (text) {

                            text.textContent =
                                `${files.length} photo${
                                    files.length > 1
                                        ? "s"
                                        : ""
                                } selected`;

                        }

                    }

                }
            );

        }



        /* =====================================
           PARTNERSHIP FORM
        ====================================== */

        const partnerForm =
            document.getElementById(
                "partnerFormElement"
            );


        const formMessage =
            document.getElementById(
                "formMessage"
            );


        if (partnerForm) {

            partnerForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();


                    /* Get form data */

                    const formData =
                        new FormData(
                            partnerForm
                        );


                    const fullName =
                        formData.get(
                            "fullName"
                        );


                    const email =
                        formData.get(
                            "email"
                        );


                    const craftCategory =
                        formData.get(
                            "craftCategory"
                        );


                    /*
                        Temporary frontend
                        submission.

                        Later this can be replaced
                        with your backend/API.
                    */

                    console.log(
                        "Silpam Partnership Request",
                        {
                            fullName,
                            email,
                            craftCategory
                        }
                    );


                    /* Success message */

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your partnership request has been received.";

                    }


                    /* Reset form */

                    partnerForm.reset();


                    /* Reset upload text */

                    const uploadText =
                        document.querySelector(
                            ".upload-box strong"
                        );


                    if (uploadText) {

                        uploadText.textContent =
                            "Click to upload";

                    }

                }
            );

        }



        /* =====================================
           SIMPLE SCROLL REVEAL
        ====================================== */

        const revealElements =
            document.querySelectorAll(
                ".benefit-item, .partner-type-card, .process-step"
            );


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    }
);