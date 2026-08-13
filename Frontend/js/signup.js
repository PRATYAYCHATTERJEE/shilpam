/* =========================================
   SILPAM — SIGN UP
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       PASSWORD
    ========================================= */

    const password =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");


    if (password && passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            () => {

                if (password.type === "password") {

                    password.type = "text";

                } else {

                    password.type = "password";

                }

            }
        );

    }



    /* =========================================
       CONFIRM PASSWORD
    ========================================= */

    const confirmPassword =
        document.getElementById("confirmPassword");

    const confirmPasswordToggle =
        document.getElementById(
            "confirmPasswordToggle"
        );


    if (
        confirmPassword &&
        confirmPasswordToggle
    ) {

        confirmPasswordToggle.addEventListener(
            "click",
            () => {

                if (
                    confirmPassword.type ===
                    "password"
                ) {

                    confirmPassword.type =
                        "text";

                } else {

                    confirmPassword.type =
                        "password";

                }

            }
        );

    }



    /* =========================================
       SIGNUP FORM
    ========================================= */

    const signupForm =
        document.getElementById("signupForm");


    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();


                const passwordValue =
                    password.value;


                const confirmPasswordValue =
                    confirmPassword.value;



                /* =================================
                   PASSWORD MATCH
                ================================= */

                if (
                    passwordValue !==
                    confirmPasswordValue
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;

                }



                /* =================================
                   BASIC PASSWORD CHECK
                ================================= */

                if (passwordValue.length < 6) {

                    alert(
                        "Password must contain at least 6 characters."
                    );

                    return;

                }



                /* =================================
                   TEMPORARY DATA
                ================================= */

                console.log(
                    "Signup Data:",
                    {
                        name,
                        email,
                        phone,
                        password:
                            passwordValue
                    }
                );


                /*
                    Backend registration
                    will be connected here later.
                */


                alert(
                    "Account details submitted successfully!"
                );

            }
        );

    }

});