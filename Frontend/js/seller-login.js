/* =========================================================
   SILPAM SELLER LOGIN
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginForm = document.getElementById("sellerLoginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const loginBtn =
    document.getElementById("loginBtn");

const googleLogin =
    document.getElementById("googleLogin");

const forgotPassword =
    document.getElementById("forgotPassword");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

togglePassword.addEventListener("click", () => {

    const isPassword =
        passwordInput.type === "password";

    if (isPassword) {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

        togglePassword.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁";

        togglePassword.setAttribute(
            "aria-label",
            "Show password"
        );
    }

});


/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================================
   CLEAR ERRORS
   ========================================================= */

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";

}


/* =========================================================
   LOGIN FORM
   ========================================================= */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearErrors();


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value.trim();


    let valid = true;


    /* Email */

    if (!email) {

        emailError.textContent =
            "Please enter your email address.";

        valid = false;

    } else if (!validateEmail(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;
    }


    /* Password */

    if (!password) {

        passwordError.textContent =
            "Please enter your password.";

        valid = false;

    } else if (password.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;
    }


    if (!valid) {
        return;
    }


    /* =====================================================
       BUTTON LOADING
       ===================================================== */

    loginBtn.classList.add("loading");

    loginBtn.querySelector("span:first-child").textContent =
        "Signing you in...";


    try {

        /* =================================================
           SEND LOGIN REQUEST
           ================================================= */

        const response = await fetch(
            "http://localhost:5000/api/sellers/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        console.log(
            "SELLER LOGIN RESPONSE:",
            data
        );


        /* =================================================
           HANDLE ERROR
           ================================================= */

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Seller login failed."
            );

        }


        /* =================================================
           SAVE JWT
           ================================================= */

        localStorage.setItem(
            "sellerToken",
            data.token
        );


        /* =================================================
           SAVE SELLER DATA
           ================================================= */

        localStorage.setItem(
            "seller",
            JSON.stringify(data.seller)
        );


        console.log(
            "Seller logged in:",
            data.seller
        );


        /* =================================================
           REDIRECT
           ================================================= */

        window.location.href =
            "Seller-dashboard.html";


    } catch (error) {

        console.error(
            "Seller login error:",
            error
        );


        passwordError.textContent =
            error.message ||
            "Unable to login. Please try again.";

    } finally {

        loginBtn.classList.remove("loading");

        loginBtn.querySelector("span:first-child").textContent =
            "Login to Seller Dashboard";

    }

});