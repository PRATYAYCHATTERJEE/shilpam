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
        async (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

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
                alert("Passwords do not match.");
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
               SEND DATA TO BACKEND
            ================================= */

            try {

                const response = await fetch(
                    "http://localhost:5000/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            phone: phone,
                            password: passwordValue
                        })
                    }
                );


                const data = await response.json();


                /* =================================
                   HANDLE RESPONSE
                ================================= */

                if (!response.ok) {

                    alert(data.message || "Registration failed.");

                    return;
                }


                alert("Account created successfully!");

                // Go to login page
                window.location.href = "login.html";


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                alert(
                    "Unable to connect to the server. Please try again."
                );
            }
        }
    );
}

});