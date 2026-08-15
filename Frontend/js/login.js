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
        async (event) => {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const passwordValue =
                password.value;


            /* =================================
               SEND LOGIN REQUEST
            ================================= */

            try {

                const response = await fetch(
                    "http://localhost:5000/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: passwordValue
                        })
                    }
                );


                const data = await response.json();


                /* =================================
                   HANDLE RESPONSE
                ================================= */

                if (!response.ok) {

                    alert(
                        data.message ||
                        "Invalid email or password."
                    );

                    return;
                }


// Store JWT
localStorage.setItem("token", data.token);

// Store user information
localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);

console.log("LOGIN RESPONSE:", data);
console.log("JWT TOKEN:", data.token);
console.log("USER:", data.user);

alert("Login successful!");

window.location.href = "index.html";


            } catch (error) {

                console.error(
                    "Login error:",
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