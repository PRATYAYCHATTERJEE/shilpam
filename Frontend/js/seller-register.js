const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const indicator1 = document.getElementById("stepIndicator1");
const indicator2 = document.getElementById("stepIndicator2");

const backBtn = document.getElementById("backBtn");

// Temporary seller account data
let sellerAccountData = {};


/* =========================================
   STEP 1 → STEP 2
========================================= */

step1.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check passwords
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Store Step 1 information temporarily
    sellerAccountData = {
        email: email,
        password: password
    };


    // Move to Step 2
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
   STEP 2 → SUBMIT SELLER APPLICATION
========================================= */

step2.addEventListener("submit", async function (e) {

    e.preventDefault();


    // Get Step 2 information
    const fullName =
        document.getElementById("fullName").value.trim();

    const businessName =
        document.getElementById("businessName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const sellerEmail =
        document.getElementById("sellerEmail").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const craftCategory =
        document.getElementById("craftCategory").value;

    const experience =
        document.getElementById("experience").value;

    const craftStory =
        document.getElementById("craftStory").value.trim();


    // Make sure Step 1 email and Step 2 email match
    if (sellerAccountData.email !== sellerEmail) {

        alert(
            "The email addresses in Step 1 and Step 2 do not match."
        );

        return;
    }


    // Prepare data for backend
    const sellerData = {

        email: sellerAccountData.email,

        password: sellerAccountData.password,

        fullName: fullName,

        businessName: businessName,

        phone: phone,

        location: location,

        craftCategory: craftCategory,

        experience: experience,

        craftStory: craftStory
    };


    try {

        // Disable submit button
        const submitButton =
            step2.querySelector("button[type='submit']");

        submitButton.disabled = true;

        submitButton.innerText = "Submitting...";


        // Send data to backend
        const response = await fetch(
            "http://localhost:5000/api/sellers/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(sellerData)
            }
        );


        const data = await response.json();


        // Handle error
        if (!response.ok) {

            alert(
                data.message ||
                "Unable to submit partnership request."
            );

            submitButton.disabled = false;
            submitButton.innerHTML =
                "<span>✦</span> Submit Partnership Request";

            return;
        }


        // Success
            console.log(
                "Seller registration successful:",data);


        // Save seller information
            localStorage.setItem("seller", JSON.stringify(data.seller));


        // Success message
            alert("Thank you! Your partnership request has been submitted successfully.");


        // Redirect to seller dashboard
            window.location.href = "seller-dashboard.html";


    } catch (error) {

        console.error(
            "Seller registration error:",
            error
        );


        alert(
            "Unable to connect to the server. Please try again."
        );


        const submitButton =
            step2.querySelector("button[type='submit']");

        submitButton.disabled = false;

        submitButton.innerHTML =
            "<span>✦</span> Submit Partnership Request";
    }

});