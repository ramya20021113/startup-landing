// Minimal JavaScript for static startup landing page
document.addEventListener("DOMContentLoaded", function () {
  window.handleSubmit = handleSubmit;
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
  // book a call send
  // ==============================

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
  const filterButtons = document.querySelectorAll(".filter-btn");
  const blogCards = document.querySelectorAll(".blog-card");
  const loadMoreBtn = document.querySelector(".load-more-btn");

  let visibleCount = 3;
  let activeFilter = "all post";
  let loadMoreClicked = false;

  function applyFilter(filter) {
    activeFilter = filter;
    let matched = 0;

    blogCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const matches = filter === "all post" || categories.includes(filter);

      if (matches) {
        matched++;
        if (filter === "all post") {
          // All Post → respect visibleCount
          card.style.display = matched <= visibleCount ? "block" : "none";
        } else {
          // Category filters
          if (loadMoreClicked) {
            // After Load More → show all
            card.style.display = "block";
          } else {
            // Before Load More → show only first 3 unhidden
            card.style.display =
              matched <= 3 && !card.classList.contains("hidden")
                ? "block"
                : "none";
          }
        }
      } else {
        card.style.display = "none";
      }
    });

    // Button visibility logic
    if (filter === "all post") {
      const totalMatched = Array.from(blogCards).filter((card) => {
        const categories = card.dataset.category.split(" ");
        return categories.includes(filter) || filter === "all post";
      }).length;
      loadMoreBtn.style.display =
        totalMatched > visibleCount ? "block" : "none";
    } else {
      if (loadMoreClicked) {
        loadMoreBtn.style.display = "none"; // hide after load more
      } else {
        loadMoreBtn.style.display = "block"; // show before load more
      }
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.textContent.trim().toLowerCase();
      applyFilter(filter);
    });
  });

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 3;
    loadMoreClicked = true;

    blogCards.forEach((card, index) => {
      const categories = card.dataset.category.split(" ");
      if (activeFilter === "all post" || categories.includes(activeFilter)) {
        card.style.display = "block";
        card.classList.remove("hidden");
      }
    });

    // Hide button if no hidden posts remain
    if (activeFilter === "all post") {
      if (visibleCount >= blogCards.length) {
        loadMoreBtn.style.display = "none";
      }
    } else {
      loadMoreBtn.style.display = "none";
    }
  });

  // Initial load
  applyFilter("all post");

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
    dots[0].classList.add("active");
  }

  // ==============================
  // Scroll-to-top button
  // ==============================
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
  const featuresSection = document.querySelector("#features");
  const footer = document.querySelector("footer");

  let lastScrollY = 0; // track scroll direction

  if (scrollTopBtn && featuresSection && footer) {
    window.addEventListener("scroll", () => {
      const featureTop = featuresSection.offsetTop;
      const footerTop = footer.offsetTop;
      const currentY = window.scrollY;

      if (currentY > lastScrollY) {
        // ✅ Scrolling DOWN
        if (currentY + window.innerHeight >= footerTop) {
          scrollTopBtn.style.display = "flex"; // show only at footer
        } else {
          scrollTopBtn.style.display = "none"; // hidden before footer
        }
      } else {
        // ✅ Scrolling UP
        if (currentY >= featureTop) {
          scrollTopBtn.style.display = "flex"; // keep showing until features top
        } else {
          scrollTopBtn.style.display = "none"; // hide above features
        }
      }

      lastScrollY = currentY; // update last scroll position
    });

    // Smooth scroll to top
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
  let selectedSubject = "";

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
    if (subjectText) subjectText.textContent = subject;

    // ✅ set selected subject correctly
    selectedSubject = subject;

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
    openBtn.onclick = () => {
      panel.classList.add("open");
      document.body.classList.add("no-scroll"); // 🚀 freeze body scroll
    };
    closeBtn.onclick = closePanel;
  }

  // ✅ add this missing function
  function closePanel() {
    const panel = document.getElementById("sidePanel");
    if (panel) panel.classList.remove("open");
    document.body.classList.remove("no-scroll"); 
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
        selectSelected.style.color = "#ccc";

        // ✅ set selectedSubject here too
        selectedSubject = this.textContent;

        selectItems.classList.add("select-hide");
        selectSelected.classList.remove("select-arrow-active");
        isSelectOpen = false;
      });
    });
  }

  function handleSubmit() {
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");

    // Reset message
    formMessage.textContent = "";
    formMessage.className = "";
    formMessage.style.display = "none";

    if (!selectedSubject) {
      formMessage.textContent = "Please choose a subject.";
      formMessage.className = "error";
      formMessage.style.display = "block";
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.className = "error";
      formMessage.style.display = "block";
      return;
    }

    if (!message) {
      formMessage.textContent = "Please enter a message.";
      formMessage.className = "error";
      formMessage.style.display = "block";
      return;
    }

    // ✅ Success
    formMessage.textContent = "Submission successful! We'll contact you soon.";
    formMessage.className = "success";
    formMessage.style.display = "block";

    // Reset form
    document.querySelector("#subjectSelect .select-selected").textContent =
      "Select a subject";
    document
      .querySelector("#subjectSelect .select-selected")
      .classList.remove("select-arrow-active");
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    selectedSubject = "";

    // ✅ Close the panel after 2 seconds
    setTimeout(closePanel, 2000);
  }

  //box animation
  const box1 = document.querySelector(".black-box1");
  const box2 = document.querySelector(".black-box2");

  document.addEventListener("mousemove", function (e) {
    const xPercent = (e.clientX / window.innerWidth - 1) * 2;
    const yPercent = (e.clientY / window.innerHeight - 1) * 2;

    // Small box (moves less)
    box1.style.transform = `translate(${xPercent * 20}px, ${yPercent * 20}px)`;

    // Big box (moves more)
    box2.style.transform = `translate(${xPercent * 20}px, ${yPercent * 20}px)`;
  });

  document.addEventListener("mouseleave", function () {
    box1.style.transform = "translate(0, 0)";
    box2.style.transform = "translate(0, 0)";
  });

  const sidePanel = document.getElementById("sidePanel");

  const floatingBtns = document.querySelector(".floating-buttons");

  openBtn.addEventListener("click", () => {
    sidePanel.classList.add("open");

    // Move floating buttons inside the panel
    sidePanel.appendChild(floatingBtns);
    floatingBtns.classList.remove("fixed");
    floatingBtns.classList.add("inside");
  });

  closeBtn.addEventListener("click", () => {
    sidePanel.classList.remove("open");

    // Move floating buttons back outside (end of body)
    document.body.appendChild(floatingBtns);
    floatingBtns.classList.remove("inside");
    floatingBtns.classList.add("fixed");
  });
});
