// Minimal JavaScript for static startup landing page
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Blog filter functionality
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      if (email) {
        alert("Thank you for subscribing!");
        emailInput.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  // CTA button click handler
  const ctaButton = document.querySelector(".cta-button");

  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      alert("Quote request sent! We'll contact you soon.");
    });
  }

  // Primary button click handler
  const primaryButton = document.querySelector(".primary-button");

  if (primaryButton) {
    primaryButton.addEventListener("click", function () {
      alert("Getting started! Redirecting...");
    });
  }

  // Load more button functionality
  const loadMoreBtn = document.querySelector(".load-more-btn");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      this.textContent = "Loading...";
      this.disabled = true;

      // Simulate loading more content
      setTimeout(() => {
        this.textContent = "Load More";
        this.disabled = false;
        alert("More content loaded!");
      }, 2000);
    });
  }

  console.log("Startup Landing Page loaded successfully!");
});
