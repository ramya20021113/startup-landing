// Minimal JavaScript for static startup landing page
document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // Smooth scrolling navigation
  // ==============================
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Handle only in-page links that start with #
      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const headerHeight = document.querySelector("header").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Set the active class for in-page links
          setActive(this);
        }
      }
      // External links (like blog.html) will just follow default behavior
    });
  });

  function setActive(clickedLink) {
    const allLinks = document.querySelectorAll(".nav-link");
    allLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  // ==============================
  // Blog filter functionality
  // ==============================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Get filter name
      const filter = button.textContent.trim().toLowerCase();

      blogCards.forEach((card) => {
        const categories = card.dataset.category
          ? card.dataset.category.split(" ")
          : [];

        if (filter === "all post") {
          card.style.display = "block";
        } else if (categories.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ==============================
  // Newsletter form submission
  // ==============================
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

  // ==============================
  // Primary button
  // ==============================
  const primaryButton = document.querySelector(".primary-button");
  if (primaryButton) {
    primaryButton.addEventListener("click", function () {
      alert("Getting started! Redirecting...");
    });
  }

  // ==============================
  // Load more blog posts
  // ==============================
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.textContent.trim().toLowerCase();

      blogCards.forEach((card, index) => {
        const categories = card.dataset.category.split(" ");

        if (filter === "all post") {
          // Show everything
          card.style.display = "block";
          card.classList.remove("hidden"); // 👈 remove hidden so all show
        } else if (categories.includes(filter)) {
          card.style.display = "block";
          card.classList.remove("hidden"); // 👈 remove hidden for filtered ones
        } else {
          card.style.display = "none";
        }
      });

      // Reset Load More when switching filters
      if (filter === "all post") {
        loadMoreBtn.style.display = "none"; // All posts visible, no need load more
      } else {
        loadMoreBtn.style.display = "block"; // Filters can still use load more
      }
    });
  });



  // ==============================
  // Testimonial slider
  // ==============================
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-card");
  const dotsContainer = document.querySelector(".slider-dots");

  if (slides.length && dotsContainer) {
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

    slides[0].classList.add("active");
    setInterval(autoSlide, 5000);
  }

  // ==============================
  // Scroll-to-top button
  // ==============================
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTopBtn.style.display = "flex";
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
  }

  // ==============================
  // Reveal animations on scroll
  // ==============================
  function revealOnScroll() {
    const elements = document.querySelectorAll(
      ".slide-in-left, .slide-in-right, .slide-in-bottom , .feature-box123"
    );
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  // ==============================
  // Counter animation
  // ==============================
  let countersStarted = false;

  function animateCounter(el, target, duration = 1000) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);

      el.innerText = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerText = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  function triggerCountersOnScroll() {
    const counters = document.querySelectorAll(".counter");
    const firstCounter = counters[0];
    if (!firstCounter) return;

    const rect = firstCounter.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;

    if (isVisible && !countersStarted) {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        animateCounter(counter, target, 1000);
      });
      countersStarted = true;
    }
  }

  window.addEventListener("scroll", triggerCountersOnScroll);
  window.addEventListener("load", triggerCountersOnScroll);

  // ==============================
  // Custom select + panel toggle
  // ==============================
  function toggleSelect() {
    const selectItems = document.querySelector(".custom-select .select-items");
    selectItems.classList.toggle("select-hide");
  }

  function selectOption(subject) {
    const selectSelected = document.querySelector(
      ".custom-select .select-selected"
    );
    const subjectText = document.getElementById("subjectText");

    selectSelected.textContent = subject;
    subjectText.textContent = subject;

    const selectItems = document.querySelector(".custom-select .select-items");
    selectItems.classList.add("select-hide");
  }

  document.addEventListener("click", (event) => {
    const customSelect = document.querySelector(".custom-select");
    if (customSelect && !customSelect.contains(event.target)) {
      const selectItems = customSelect.querySelector(".select-items");
      if (selectItems) selectItems.classList.add("select-hide");
    }
  });

  let isSelectOpen = false;

  const openBtn = document.getElementById("openPanel");
  const closeBtn = document.getElementById("closePanel");
  const panel = document.getElementById("sidePanel");

  if (openBtn && closeBtn && panel) {
    openBtn.onclick = () => panel.classList.add("open");
    closeBtn.onclick = () => panel.classList.remove("open");
  }

  const customSelect = document.getElementById("subjectSelect");
  if (customSelect) {
    const selectItems = customSelect.querySelector(".select-items");
    const selectSelected = customSelect.querySelector(".select-selected");

    customSelect.addEventListener("click", function (event) {
      event.stopPropagation();
      isSelectOpen = !isSelectOpen;

      if (isSelectOpen) {
        selectItems.classList.remove("select-hide");
        selectSelected.classList.add("select-arrow-active");
      } else {
        selectItems.classList.add("select-hide");
        selectSelected.classList.remove("select-arrow-active");
      }
    });

    const options = customSelect.querySelectorAll(".select-option");
    options.forEach((option) => {
      option.addEventListener("click", function (event) {
        event.stopPropagation();
        selectSelected.textContent = this.textContent;
        selectSelected.style.color = "#333";
        selectItems.classList.add("select-hide");
        selectSelected.classList.remove("select-arrow-active");
        isSelectOpen = false;
      });
    });
  }

  function handleSubmit() {
    const selectSelected = document.querySelector(
      ".custom-select .select-selected"
    );
    const selectedText = selectSelected.textContent;
    const emailText = document.getElementById("email").value;
    const messageText = document.getElementById("message").value;

    if (selectedText === "Select a subject") {
      alert("Please select a subject before sending.");
      return;
    }

    if (!emailText.trim()) {
      alert("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailText)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!messageText.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    alert(
      `Thank you! Your message about "${selectedText}" has been sent from ${emailText}. We'll get back to you soon!`
    );

    selectSelected.textContent = "Select a subject";
    selectSelected.style.color = "#666";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }
});
