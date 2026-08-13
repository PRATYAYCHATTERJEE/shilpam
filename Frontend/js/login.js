/* =========================================
   SILPAM — LOGIN PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const password =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");


    /* =========================================
       SHOW / HIDE PASSWORD
    ========================================= */

    if (password && passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            () => {

                if (password.type === "password") {

                    password.type = "text";

                    passwordToggle.textContent = "◉";

                } else {

                    password.type = "password";

                    passwordToggle.textContent = "◉";

                }

            }
        );

    }


    /* =========================================
       LOGIN FORM
    ========================================= */

    const loginForm =
        document.querySelector(".login-form");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const email =
                    document.getElementById("email").value;

                const passwordValue =
                    password.value;


                console.log("Login attempt:", {
                    email,
                    password: passwordValue
                });

                /*
                    Backend authentication
                    will be connected here later.
                */

            }
        );

    }

});