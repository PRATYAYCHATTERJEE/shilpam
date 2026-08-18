document.addEventListener("DOMContentLoaded", () => {

    console.log("Seller dashboard loaded");


    // Get seller data from Local Storage
    const sellerData =
        localStorage.getItem("seller");


    console.log("Raw seller data:", sellerData);


    // Check if seller data exists
    if (!sellerData) {

        console.error(
            "No seller data found in Local Storage."
        );

        return;
    }


    // Convert JSON string into object
    let seller;

    try {

        seller = JSON.parse(sellerData);

    } catch (error) {

        console.error(
            "Unable to parse seller data:",
            error
        );

        return;
    }


    console.log(
        "Seller object:",
        seller
    );


    // =========================================
    // SELLER NAME
    // =========================================

    const sellerName =
        seller.fullName || "Seller";


    // =========================================
    // BUSINESS NAME
    // =========================================

    const businessName =
        seller.businessName || "Your Business";


    // =========================================
    // HEADER
    // =========================================

    const sellerNameElement =
        document.getElementById("sellerName");

    const profileNameElement =
        document.getElementById("profileName");

    const profileBusinessElement =
        document.getElementById("profileBusiness");


    if (sellerNameElement) {

        sellerNameElement.textContent =
            sellerName;
    }


    if (profileNameElement) {

        profileNameElement.textContent =
            sellerName;
    }


    if (profileBusinessElement) {

        profileBusinessElement.textContent =
            businessName;
    }


    // =========================================
    // AVATAR
    // =========================================

    const avatar =
        document.getElementById("avatar");


    if (avatar) {

        avatar.textContent =
            sellerName
                .charAt(0)
                .toUpperCase();
    }


    // =========================================
    // SELLER INFORMATION
    // =========================================

    const infoName =
        document.getElementById("infoName");

    const infoBusiness =
        document.getElementById("infoBusiness");

    const infoEmail =
        document.getElementById("infoEmail");

    const infoPhone =
        document.getElementById("infoPhone");

    const infoLocation =
        document.getElementById("infoLocation");

    const infoCategory =
        document.getElementById("infoCategory");


    if (infoName) {

        infoName.textContent =
            seller.fullName || "—";
    }


    if (infoBusiness) {

        infoBusiness.textContent =
            seller.businessName || "—";
    }


    if (infoEmail) {

        infoEmail.textContent =
            seller.email || "—";
    }


    if (infoPhone) {

        infoPhone.textContent =
            seller.phone || "—";
    }


    if (infoLocation) {

        infoLocation.textContent =
            seller.location || "—";
    }


    if (infoCategory) {

        infoCategory.textContent =
            seller.craftCategory || "—";
    }


    // =========================================
    // LOGOUT
    // =========================================

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "seller"
                );

                localStorage.removeItem(
                    "sellerToken"
                );

                window.location.href =
                    "seller-login.html";
            }
        );

    }

});