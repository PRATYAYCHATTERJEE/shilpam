document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadAdminData();

    }
);


/* =========================================
   GET ADMIN TOKEN
========================================= */

function getAdminToken() {

    return localStorage.getItem(
        "token"
    );
}


/* =========================================
   LOAD ADMIN DATA
========================================= */

async function loadAdminData() {

    const token =
        getAdminToken();


    if (!token) {

        alert(
            "Admin login required."
        );

        window.location.href =
            "login.html";

        return;

    }


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/admin/sellers",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        console.log(
            "ADMIN SELLER DATA:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to fetch sellers."
            );

        }


        displaySellers(
            data.sellers
        );


    } catch (error) {

        console.error(
            "Admin dashboard error:",
            error
        );


        document.getElementById(
            "errorMessage"
        ).textContent =
            error.message;

    }

}


/* =========================================
   DISPLAY SELLERS
========================================= */

function displaySellers(
    sellers
) {

    const tableBody =
        document.getElementById(
            "sellerTableBody"
        );


    const loading =
        document.getElementById(
            "loading"
        );


    loading.style.display =
        "none";


    tableBody.innerHTML = "";


    /* ===============================
       STATISTICS
    =============================== */

    const total =
        sellers.length;


    const pending =
        sellers.filter(
            seller =>
                seller.status === "pending"
        ).length;


    const approved =
        sellers.filter(
            seller =>
                seller.status === "approved"
        ).length;


    const rejected =
        sellers.filter(
            seller =>
                seller.status === "rejected"
        ).length;


    document.getElementById(
        "totalSellers"
    ).textContent = total;


    document.getElementById(
        "pendingSellers"
    ).textContent = pending;


    document.getElementById(
        "approvedSellers"
    ).textContent = approved;


    document.getElementById(
        "rejectedSellers"
    ).textContent = rejected;


    /* ===============================
       NO SELLERS
    =============================== */

    if (sellers.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No seller applications found.
                </td>
            </tr>
        `;

        return;
    }


    /* ===============================
       CREATE ROWS
    =============================== */

    sellers.forEach(
        seller => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${seller.fullName || "—"}
                    </strong>
                </td>

                <td>
                    ${seller.businessName || "—"}
                </td>

                <td>
                    ${seller.email || "—"}
                </td>

                <td>
                    ${seller.craftCategory || "—"}
                </td>

                <td>
                    ${seller.location || "—"}
                </td>

                <td>

                    <span class="status ${seller.status}">
                        ${seller.status}
                    </span>

                </td>

                <td>

                    ${
                        seller.status !== "approved"
                        ?
                        `
                        <button
                            class="action-btn approve-btn"
                            onclick="updateSellerStatus(
                                '${seller._id}',
                                'approved'
                            )">

                            Approve

                        </button>
                        `
                        :
                        ""
                    }


                    ${
                        seller.status !== "rejected"
                        ?
                        `
                        <button
                            class="action-btn reject-btn"
                            onclick="updateSellerStatus(
                                '${seller._id}',
                                'rejected'
                            )">

                            Reject

                        </button>
                        `
                        :
                        ""
                    }

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );

}


/* =========================================
   UPDATE SELLER STATUS
========================================= */

async function updateSellerStatus(
    sellerId,
    status
) {

    const token =
        getAdminToken();


    if (!token) {

        alert(
            "Admin authentication required."
        );

        return;

    }


    const action =
        status === "approved"
            ? "approve"
            : "reject";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} this seller?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/admin/sellers/${sellerId}/status`,
                {
                    method: "PATCH",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({
                        status: status
                    })
                }
            );


        const data =
            await response.json();


        console.log(
            "STATUS UPDATE:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to update seller."
            );

        }


        alert(
            `Seller ${status} successfully.`
        );


        // Reload seller list
        loadAdminData();


    } catch (error) {

        console.error(
            "Status update error:",
            error
        );


        alert(
            error.message
        );

    }

}


/* =========================================
   REFRESH BUTTON
========================================= */

document
    .getElementById("refreshBtn")
    ?.addEventListener(
        "click",
        () => {

            loadAdminData();

        }
    );


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutBtn")
    ?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "login.html";

        }
    );