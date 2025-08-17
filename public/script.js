// Minimal JavaScript for static startup landing page
document.addEventListener("DOMContentLoaded", function () {
  // CTA button click handler
  const openBtn = document.getElementById("openPanel");
  const closeBtn = document.getElementById("closePanel");
  const panel = document.getElementById("sidePanel");

  openBtn.onclick = () => panel.classList.add("open");
  closeBtn.onclick = () => panel.classList.remove("open");
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll smoothly
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

      // Set active class
      setActive(this);
    });
  });

  function setActive(clickedLink) {
    const allLinks = document.querySelectorAll(".nav-link");
    allLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }

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

  // Primary button click handler
  const primaryButton = document.querySelector(".primary-button");

  if (primaryButton) {
    primaryButton.addEventListener("click", function () {
      alert("Getting started! Redirecting...");
    });
  }

  // Load more button functionality
  const loadMoreBtn = document.querySelector(".load-more-btn");
  const itemsToShow = 3;

  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card, index) => {
    if (index >= 3) {
      card.classList.add("hidden");
    }
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenPosts = document.querySelectorAll(".blog-card.hidden");
      let revealed = 0;

      hiddenPosts.forEach((post) => {
        if (revealed < itemsToShow) {
          post.classList.remove("hidden");
          revealed++;
        }
      });

      if (document.querySelectorAll(".blog-card.hidden").length === 0) {
        loadMoreBtn.style.display = "none";
      }
    });
  }
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-card");
  const dotsContainer = document.querySelector(".slider-dots");

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dots .dot");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Change slide every 5 seconds

  slides[0].classList.add("active"); // Start

  // scrolling
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
