document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Select modal elements
    const newsletterModal = document.getElementById("newsletter-modal");
    const closeNewsletterModal = document.getElementById("close-newsletter-modal");
    const newsletterForm = document.getElementById("newsletter-form");
    const ctaNewsletterForm = document.getElementById("cta-newsletter-form");
    const navLinks = document.querySelectorAll("nav a");
    const podcastButton = document.querySelector(".cta-button");

    // Select "About Dr. Audio" modal elements
    const learnMoreModal = document.getElementById("modal");
    const closeLearnMoreModal = document.getElementById("close-learnMore");
    const learnMoreButton = document.getElementById("learnMore");

    let nextPage = ""; // Stores the clicked page link

    function hasSubscribed() {
        return localStorage.getItem("subscribed") === "true";
    }

    function hasSeenAboutPopup() {
        return localStorage.getItem("aboutPopupClosed") === "true";
    }

    function stopAllPopups() {
        console.log("Stopping all pop-ups permanently.");
        localStorage.setItem("subscribed", "true"); // Stop newsletter pop-up
        localStorage.setItem("aboutPopupClosed", "true"); // Stop "About Dr. Audio" pop-up
    }

    if (hasSubscribed()) {
        console.log("User already subscribed. Hiding all pop-ups.");
        if (newsletterModal) newsletterModal.style.display = "none";
        if (learnMoreModal) learnMoreModal.style.display = "none";
    }

    function forceNewsletterPopup(event) {
        event.preventDefault(); // Prevent page navigation
        nextPage = this.href; // Store clicked page link

        console.log("Clicked Link:", nextPage);

        if (hasSubscribed()) {
            console.log("User already subscribed. Navigating to:", nextPage);
            window.location.href = nextPage;
            return;
        }

        console.log("Opening Newsletter Modal...");
        newsletterModal.style.display = "block";
    }

    navLinks.forEach(link => {
        console.log("Adding Click Listener to:", link.href);
        link.addEventListener("click", forceNewsletterPopup);
    });

    if (podcastButton) {
        podcastButton.dataset.link = "podcast.html";
        podcastButton.addEventListener("click", forceNewsletterPopup);
    }

    if (closeNewsletterModal) {
        closeNewsletterModal.addEventListener("click", function () {
            console.log("Closing Newsletter Modal");
            newsletterModal.style.display = "none";
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === newsletterModal) {
            console.log("Clicked Outside, Closing Newsletter Modal");
            newsletterModal.style.display = "none";
        }
    });

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("newsletter-email").value;

            console.log("User Subscribed via Modal:", email);

            stopAllPopups();

            alert("Thank you for subscribing, " + email + "!");

            newsletterModal.style.display = "none";
            if (nextPage) {
                console.log("Redirecting to:", nextPage);
                window.location.href = nextPage;
            }
        });
    }

    if (ctaNewsletterForm) {
        ctaNewsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("cta-newsletter-email").value;

            console.log("User Subscribed via Footer:", email);

            stopAllPopups();

            alert("Thank you for subscribing, " + email + "!");
        });
    }

    if (!hasSubscribed()) {
        console.log("User has NOT subscribed. Showing popup in 7 seconds...");
        setTimeout(() => {
            console.log("Opening Newsletter Popup NOW");
            newsletterModal.style.display = "block";
        }, 7000);
    } else {
        console.log("User already subscribed. Popup will NOT show again.");
    }

    if (learnMoreButton) {
        learnMoreButton.addEventListener("click", function () {
            console.log("Opening Learn More Modal...");
            learnMoreModal.style.display = "block";
        });
    }

    if (closeLearnMoreModal) {
        closeLearnMoreModal.addEventListener("click", function (event) {
            console.log("Closing Learn More Modal");
            learnMoreModal.style.display = "none";
            event.stopPropagation(); // Prevents conflicts

            localStorage.setItem("aboutPopupClosed", "true");
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === learnMoreModal) {
            console.log("Clicked Outside, Closing Learn More Modal");
            learnMoreModal.style.display = "none";

            localStorage.setItem("aboutPopupClosed", "true");
        }
    });

    if (hasSeenAboutPopup() || hasSubscribed()) {
        console.log("User has seen About Dr. Audio popup OR is subscribed. Hiding it.");
        learnMoreModal.style.display = "none";
    }

document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blog-form");
    const blogSubmissionMessage = document.getElementById("blog-submission-message");

    if (blogForm) {
        blogForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get user input
            let title = document.getElementById("blog-title").value;
            let author = document.getElementById("blog-author").value;
            let content = document.getElementById("blog-content").value;

            console.log("New Blog Post Submitted:");
            console.log("Title:", title);
            console.log("Author:", author);
            console.log("Content:", content);

            blogSubmissionMessage.style.display = "block";

            blogForm.reset();

            setTimeout(() => {
                blogSubmissionMessage.style.display = "none";
            }, 5000);
        });
    }
});

});

