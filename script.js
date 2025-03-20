document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Select modal elements
    const newsletterModal = document.getElementById("newsletter-modal");
    const closeNewsletterModal = document.getElementById("close-newsletter-modal");
    const newsletterForm = document.getElementById("newsletter-form");
    const ctaNewsletterForm = document.getElementById("cta-newsletter-form");
    const navLinks = document.querySelectorAll("nav a");
    const podcastButton = document.querySelector(".cta-button");

    let nextPage = ""; // Stores the clicked page link

    // ✅ Check if the user has already subscribed
    function hasSubscribed() {
        return localStorage.getItem("subscribed") === "true";
    }

    // ✅ Function to force the newsletter popup until they subscribe
    function forceNewsletterPopup(event) {
        event.preventDefault(); // Prevent page navigation
        nextPage = this.href; // Store clicked page link

        console.log("Clicked Link:", nextPage);

        // ✅ If subscribed, allow normal navigation
        if (hasSubscribed()) {
            console.log("User already subscribed. Navigating to:", nextPage);
            window.location.href = nextPage;
            return;
        }

        console.log("Opening Newsletter Modal...");
        newsletterModal.style.display = "block";
    }

    // ✅ Attach event listeners to all navigation links
    navLinks.forEach(link => {
        console.log("Adding Click Listener to:", link.href);
        link.addEventListener("click", forceNewsletterPopup);
    });

    // ✅ Ensure "Listen to Podcast" button triggers the modal
    if (podcastButton) {
        podcastButton.dataset.link = "podcast.html";
        podcastButton.addEventListener("click", forceNewsletterPopup);
    }

    // ✅ Ensure "X" button closes the modal
    closeNewsletterModal.addEventListener("click", function () {
        console.log("Closing Newsletter Modal");
        newsletterModal.style.display = "none";
    });

    // ✅ Ensure clicking outside the modal closes it
    window.addEventListener("click", function (event) {
        if (event.target === newsletterModal) {
            console.log("Clicked Outside, Closing Newsletter Modal");
            newsletterModal.style.display = "none";
        }
    });

    // ✅ Handle Newsletter Signup (Popup Form)
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("newsletter-email").value;

        console.log("User Subscribed via Modal:", email);

        // ✅ Save subscription status
        localStorage.setItem("subscribed", "true");

        alert("Thank you for subscribing, " + email + "!");

        // ✅ Close modal and redirect user to clicked page
        newsletterModal.style.display = "none";
        if (nextPage) {
            console.log("Redirecting to:", nextPage);
            window.location.href = nextPage;
        }
    });

    // ✅ Handle Newsletter Signup (Footer Form)
    if (ctaNewsletterForm) {
        ctaNewsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("cta-newsletter-email").value;

            console.log("User Subscribed via Footer:", email);

            // ✅ Save subscription status
            localStorage.setItem("subscribed", "true");

            alert("Thank you for subscribing, " + email + "!");
        });
    }

    // ✅ Show newsletter popup on ALL pages after 7 seconds (only if not subscribed)
    if (!hasSubscribed()) {
        console.log("User has NOT subscribed. Showing popup in 7 seconds...");
        setTimeout(() => {
            console.log("Opening Newsletter Popup NOW");
            newsletterModal.style.display = "block";
        }, 7000);
    } else {
        console.log("User already subscribed. Popup will NOT show again.");
    }
});
