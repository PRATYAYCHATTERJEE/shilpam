const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const indicator1 = document.getElementById("stepIndicator1");
const indicator2 = document.getElementById("stepIndicator2");

const backBtn = document.getElementById("backBtn");


/* =========================================
   STEP 1 → STEP 2
========================================= */

step1.addEventListener("submit", function (e) {

    e.preventDefault();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    step1.classList.remove("active");

    step2.classList.add("active");


    indicator1.classList.remove("active");

    indicator2.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   BACK TO STEP 1
========================================= */

backBtn.addEventListener("click", function () {

    step2.classList.remove("active");

    step1.classList.add("active");


    indicator2.classList.remove("active");

    indicator1.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   STEP 2 SUBMIT
========================================= */

step2.addEventListener("submit", function (e) {

    e.preventDefault();

    alert(
        "Thank you for choosing SILPAM. Your partnership request has been submitted."
    );

});