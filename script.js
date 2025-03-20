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

    // ✅ Check if the user has already subscribed
    function hasSubscribed() {
        return localStorage.getItem("subscribed") === "true";
    }

    // ✅ Check if the user has already seen the "About Dr. Audio" pop-up
    function hasSeenAboutPopup() {
        return localStorage.getItem("aboutPopupClosed") === "true";
    }

    // ✅ Function to permanently stop all pop-ups after signing up
    function stopAllPopups() {
        console.log("Stopping all pop-ups permanently.");
        localStorage.setItem("subscribed", "true"); // Stop newsletter pop-up
        localStorage.setItem("aboutPopupClosed", "true"); // Stop "About Dr. Audio" pop-up
    }

    // ✅ Ensure both pop-ups never show again after signing up
    if (hasSubscribed()) {
        console.log("User already subscribed. Hiding all pop-ups.");
        if (newsletterModal) newsletterModal.style.display = "none";
        if (learnMoreModal) learnMoreModal.style.display = "none";
    }

    // ✅ Function to show the newsletter pop-up until they subscribe
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

    if (closeNewsletterModal) {
    closeNewsletterModal.addEventListener("click", function (event) {
        console.log("Closing Newsletter Modal");
        event.stopPropagation(); // Ensures no conflicts
        newsletterModal.style.display = "none";
    });
}

    // ✅ Ensure clicking outside the modal closes it
    window.addEventListener("click", function (event) {
        if (event.target === newsletterModal) {
            console.log("Clicked Outside, Closing Newsletter Modal");
            newsletterModal.style.display = "none";
        }
    });

    // ✅ Handle Newsletter Signup (Popup Form)
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("newsletter-email").value;

            console.log("User Subscribed via Modal:", email);

            // ✅ Stop both pop-ups from appearing ever again
            stopAllPopups();

            alert("Thank you for subscribing, " + email + "!");

            // ✅ Close modal and redirect user to clicked page
            newsletterModal.style.display = "none";
            if (nextPage) {
                console.log("Redirecting to:", nextPage);
                window.location.href = nextPage;
            }
        });
    }

    // ✅ Handle Newsletter Signup (Footer Form)
    if (ctaNewsletterForm) {
        ctaNewsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("cta-newsletter-email").value;

            console.log("User Subscribed via Footer:", email);

            // ✅ Stop both pop-ups from appearing ever again
            stopAllPopups();

            alert("Thank you for subscribing, " + email + "!");
        });
    }

    // ✅ Fix: Show newsletter popup on homepage after 7 seconds (only if not subscribed)
    if (!hasSubscribed()) {
        console.log("User has NOT subscribed. Showing popup in 7 seconds...");
        setTimeout(() => {
            console.log("Opening Newsletter Popup NOW");
            newsletterModal.style.display = "block";
        }, 7000);
    } else {
        console.log("User already subscribed. Popup will NOT show again.");
    }

    // ✅ Ensure "Learn More" button opens the "About Dr. Audio" modal
    if (learnMoreButton) {
        learnMoreButton.addEventListener("click", function () {
            console.log("Opening Learn More Modal...");
            learnMoreModal.style.display = "block";
        });
    }

    // ✅ Ensure "X" button closes the "About Dr. Audio" modal
    if (closeLearnMoreModal) {
        closeLearnMoreModal.addEventListener("click", function (event) {
            console.log("Closing Learn More Modal");
            learnMoreModal.style.display = "none";
            event.stopPropagation(); // Prevents conflicts

            // ✅ Save in localStorage so it won't appear again
            localStorage.setItem("aboutPopupClosed", "true");
        });
    }

    // ✅ Ensure clicking outside the "About Dr. Audio" modal closes it
    window.addEventListener("click", function (event) {
        if (event.target === learnMoreModal) {
            console.log("Clicked Outside, Closing Learn More Modal");
            learnMoreModal.style.display = "none";

            // ✅ Save in localStorage so it won't appear again
            localStorage.setItem("aboutPopupClosed", "true");
        }
    });

    // ✅ Hide "About Dr. Audio" popup if the user has already seen it or subscribed
    if (hasSeenAboutPopup() || hasSubscribed()) {
        console.log("User has seen About Dr. Audio popup OR is subscribed. Hiding it.");
        learnMoreModal.style.display = "none";
    }

    // ✅ Blog Post Submission Confirmation
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

            // Show confirmation message
            blogSubmissionMessage.style.display = "block";

            // Clear the form fields after submission
            blogForm.reset();

            // Hide the message after 5 seconds
            setTimeout(() => {
                blogSubmissionMessage.style.display = "none";
            }, 5000);
        });
    }
});




