document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#main-navigation");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
            navMenu.classList.toggle("is-open");
        });
    }

    const cards = document.querySelectorAll(".card, .product-card, .contact-card, .gallery-grid img");
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(function (item) {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image preview">&times;</button><img src="" alt=""><p></p>';
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("p");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightboxImage.src = "";
    }

    document.querySelectorAll(".gallery-grid img, .about-image").forEach(function (image) {
        image.tabIndex = 0;
        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.alt;
            lightbox.classList.add("is-open");
            lightboxClose.focus();
        });
        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                image.click();
            }
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });

    const productField = document.querySelector("#product");
    document.querySelectorAll("[data-product]").forEach(function (button) {
        button.addEventListener("click", function () {
            sessionStorage.setItem("selectedProduct", button.dataset.product);
        });
    });

    if (productField) {
        const selectedProduct = sessionStorage.getItem("selectedProduct");
        if (selectedProduct) {
            productField.value = selectedProduct;
            sessionStorage.removeItem("selectedProduct");
        }
    }

    const form = document.querySelector("#enquiry-form");
    if (form) {
        const status = document.querySelector("#form-status");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let valid = true;

            form.querySelectorAll("[required]").forEach(function (field) {
                const error = document.querySelector("#" + field.id + "-error");
                const isEmail = field.type === "email";
                const isPhone = field.id === "phone";
                let message = "";

                if (!field.value.trim()) {
                    message = "This field is required.";
                } else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
                    message = "Enter a valid email address.";
                } else if (isPhone && !/^[0-9+\s-]{10,}$/.test(field.value.trim())) {
                    message = "Enter a valid phone number.";
                }

                if (message) {
                    valid = false;
                    field.classList.add("input-error");
                    field.setAttribute("aria-invalid", "true");
                    if (error) {
                        error.textContent = message;
                    }
                } else {
                    field.classList.remove("input-error");
                    field.removeAttribute("aria-invalid");
                    if (error) {
                        error.textContent = "";
                    }
                }
            });

            if (valid) {
                status.textContent = "Thank you. Your enquiry has been checked and is ready to send.";
                status.className = "form-status success";
                form.reset();
            } else {
                status.textContent = "Please fix the highlighted fields before sending.";
                status.className = "form-status error";
            }
        });
    }

    document.querySelectorAll(".accordion-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const panel = document.querySelector("#" + button.getAttribute("aria-controls"));
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            panel.hidden = expanded;
        });
    });
});
