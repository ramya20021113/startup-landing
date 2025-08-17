// Minimal JavaScript for static startup landing page
document.addEventListener("DOMContentLoaded", function () {
  // CTA button click handler


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

  // Active link function (no changes needed here)
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
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
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

  //animation
  

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

  let countersStarted = false;

  function animateCounter(el, target, duration = 1000) {
    // 1 second duration
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
        animateCounter(counter, target, 1000); // pass 1 second duration here
      });
      countersStarted = true;
    }
  }

  window.addEventListener("scroll", triggerCountersOnScroll);
  window.addEventListener("load", triggerCountersOnScroll);

  //panel
  // Toggle dropdown open/close
  function toggleSelect() {
    const selectItems = document.querySelector(".custom-select .select-items");
    selectItems.classList.toggle("select-hide");
  }

  // Handle option selection
  function selectOption(subject) {
    const selectSelected = document.querySelector(
      ".custom-select .select-selected"
    );
    const subjectText = document.getElementById("subjectText");

    selectSelected.textContent = subject;
    subjectText.textContent = subject;

    // Close dropdown
    const selectItems = document.querySelector(".custom-select .select-items");
    selectItems.classList.add("select-hide");
  }

  // Close dropdown if clicking outside
  document.addEventListener("click", (event) => {
    const customSelect = document.querySelector(".custom-select");
    if (!customSelect.contains(event.target)) {
      const selectItems = customSelect.querySelector(".select-items");
      selectItems.classList.add("select-hide");
    }
  });





  

let isSelectOpen = false;

// Panel open/close
const openBtn = document.getElementById("openPanel");
const closeBtn = document.getElementById("closePanel");
const panel = document.getElementById("sidePanel");

openBtn.onclick = () => panel.classList.add("open");
closeBtn.onclick = () => panel.classList.remove("open");

// Dropdown toggle
const customSelect = document.getElementById("subjectSelect");
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

// Option selection
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

// Form submission
function handleSubmit() {
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

  // Reset form
  selectSelected.textContent = "Select a subject";
  selectSelected.style.color = "#666";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

});
