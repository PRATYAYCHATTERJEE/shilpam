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


    /*
       -----------------------------------------------------
       BACKEND LOGIN WILL GO HERE
       -----------------------------------------------------

       Example:

       const response = await fetch(
           "http://localhost:5000/api/sellers/login",
           {
               method: "POST",

               headers: {
                   "Content-Type": "application/json"
               },

               body: JSON.stringify({
                   email,
                   password
               })
           }
       );

       const data = await response.json();

       if (!response.ok) {
           throw new Error(data.message);
       }

       localStorage.setItem(
           "sellerToken",
           data.token
       );

       window.location.href =
           "seller-dashboard.html";

       -----------------------------------------------------
    */


    /* Temporary demo */

    setTimeout(() => {

        alert(
            "Login validated successfully!\n\n" +
            "Backend authentication can now be connected."
        );

        loginBtn.classList.remove("loading");

        loginBtn.querySelector("span:first-child").textContent =
            "Login to Seller Dashboard";

    }, 1200);

});


/* =========================================================
   GOOGLE LOGIN
   ========================================================= */

googleLogin.addEventListener("click", () => {

    /*
       Connect Google OAuth here.

       Example flow:

       window.location.href =
           "http://localhost:5000/auth/google";
    */

    alert(
        "Google Login will be connected through Google OAuth."
    );

});


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    const email =
        emailInput.value.trim();


    if (email && validateEmail(email)) {

        alert(
            "Password reset instructions will be sent to:\n" +
            email
        );

    } else {

        emailError.textContent =
            "Enter your email first to reset your password.";

        emailInput.focus();

    }

});


/* =========================================================
   REMOVE ERROR WHEN USER TYPES
   ========================================================= */

emailInput.addEventListener("input", () => {

    emailError.textContent = "";

});


passwordInput.addEventListener("input", () => {

    passwordError.textContent = "";

});