// ================================
// BLOG JAVASCRIPT - ORGANIZED
// ================================

// Global variables


let currentForm = null;
let currentCommentId = null;

// ================================
// DOM CONTENT LOADED EVENT
// ================================
document.addEventListener("DOMContentLoaded", function () {
  // ================================
  // BACK TO TOP FUNCTIONALITY
  // ================================
  const backToTopButton = document.querySelector(".back-to-top-button");

  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = "flex";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ================================
  // FORM VALIDATION
  // ================================
  const commentForm = document.querySelector(".comment-form form");

  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      let isValid = true;
      const requiredFields = commentForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert("Please fill out all required fields.");
      }
    });
  }

  // ================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}); // End of DOMContentLoaded

// ================================
// PANEL FUNCTIONALITY
// ================================


// ================================
// DROPDOWN FUNCTIONALITY
// ================================

// ================================
// FORM SUBMISSION HANDLER
// ================================
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

// ================================
// BLOG READ MORE FUNCTIONALITY
// ================================
function toggleReadMore(postId) {
  // Get all posts and their elements
  const allPosts = document.querySelectorAll(".blog-post");
  const allMoreContents = document.querySelectorAll(".moreContent");
  const allButtons = document.querySelectorAll(".readMoreBtn");

  // Get the current post elements
  const currentPost = document.getElementById(`post-${postId}`);
  const currentMoreContent = document.getElementById(`moreContent-${postId}`);
  const currentButton = currentPost?.querySelector(".readMoreBtn");

  if (!currentPost || !currentMoreContent || !currentButton) {
    console.error(`Post elements not found for postId: ${postId}`);
    return;
  }

  // Check if the current post is already expanded
  const isExpanded = currentMoreContent.style.display === "block";

  if (isExpanded) {
    // Collapse current post and show all posts
    allMoreContents.forEach((content) => {
      content.style.display = "none";
    });

    allPosts.forEach((post) => {
      post.style.display = "block";
    });

    allButtons.forEach((button) => {
      button.textContent = "Read More";
    });
  } else {
    // Expand current post and hide others
    allMoreContents.forEach((content) => {
      content.style.display = "none";
    });

    allPosts.forEach((post) => {
      if (post.id !== `post-${postId}`) {
        post.style.display = "none";
      }
    });

    // Show the current post's more content
    currentMoreContent.style.display = "block";

    // Update button text
    allButtons.forEach((button) => {
      button.textContent = "Read More";
    });
    currentButton.textContent = "Read Less";
  }
}

// ================================

// REPLY FORM FUNCTIONALITY
// ================================
function toggleReplyForm(element, commentId) {
  const avatarItem = element.closest(".avatar-item");

  // If clicking the same reply link, toggle the form
  if (currentCommentId === commentId && currentForm) {
    if (currentForm.classList.contains("show")) {
      hideCurrentForm();
      return;
    } else {
      currentForm.classList.add("show");
      return;
    }
  }

  // Hide any existing form
  hideCurrentForm();

  // Create or show form for this comment
  let form = avatarItem.querySelector(".comment-form");

  if (!form) {
    form = createReplyForm(commentId);
    const avatarText = avatarItem.querySelector(".avatar-text");
    avatarText.appendChild(form); // insert inside the text block
  }

  form.classList.add("show");
  currentForm = form;
  currentCommentId = commentId;

  // Smooth scroll to form
  setTimeout(() => {
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);
}

function hideCurrentForm() {
  if (currentForm) {
    currentForm.classList.remove("show");
    currentForm = null;
    currentCommentId = null;
  }
}

function createReplyForm(commentId) {
  const formHTML = `
      <div class="comment-form">
          <h3>Leave a Reply</h3>
          <form onsubmit="handleCommentSubmit(event, '${commentId}')">
              <div class="form-group">
                  <label for="author-${commentId}">Name <span>*</span></label>
                  <input type="text" id="author-${commentId}" name="author" required placeholder="Your name">
              </div>

              <div class="form-group">
                  <label for="email-${commentId}">Email <span>*</span></label>
                  <input type="email" id="email-${commentId}" name="email" required placeholder="your.email@example.com">
              </div>

              <div class="form-group">
                  <label for="url-${commentId}">Website</label>
                  <input type="url" id="url-${commentId}" name="url" placeholder="https://yourwebsite.com (optional)">
              </div>
              
              <div class="form-group">
                  <label for="comment-${commentId}">Message <span>*</span></label>
                  <textarea id="comment-${commentId}" name="comment" rows="8" required placeholder="Share your thoughts..."></textarea>
              </div>

              <button type="submit" class="submit-button">Submit</button>
              
          </form>
      </div>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = formHTML;
  return tempDiv.firstElementChild;
}

function handleCommentSubmit(event, commentId) {
  event.preventDefault();

  // Get form data
  const form = event.target;
  const formData = new FormData(form);

  // Here you would normally send the data to your server
  console.log("Comment submitted for:", commentId);
  console.log("Form data:", Object.fromEntries(formData));

  // Show success message (you can customize this)
  alert("Thank you for your comment! It has been submitted for review.");

  // Reset form and hide it
  form.reset();
  hideCurrentForm();
}

// ================================

// ADDITIONAL UTILITY FUNCTIONS
// ================================

// Mobile menu toggle (future use)
function toggleMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    mainNav.classList.toggle("active");
  }
}

// Blog search functionality
function searchBlog(searchTerm) {
  const blogPosts = document.querySelectorAll(".blog-post");
  const term = searchTerm.toLowerCase();

  blogPosts.forEach((post) => {
    const title = post.querySelector("h2, h3")?.textContent.toLowerCase() || "";
    const content =
      post.querySelector(".blog-excerpt, p")?.textContent.toLowerCase() || "";

    if (title.includes(term) || content.includes(term)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

// Close form when clicking outside (optional - currently disabled)
document.addEventListener("click", function (event) {
  if (
    currentForm &&
    !currentForm.contains(event.target) &&
    !event.target.classList.contains("reply-link")
  ) {
    // Don't auto-hide - let user manually close with cancel button
  }
});
