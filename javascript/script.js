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

    document.querySelectorAll(".fun-facts-list li").forEach(function (factItem) {
        factItem.tabIndex = 0;

        factItem.addEventListener("pointermove", function (event) {
            const rect = factItem.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            const rotateY = ((xPercent - 50) / 50) * 3;
            const rotateX = ((50 - yPercent) / 50) * 3;

            factItem.style.setProperty("--cursor-x", xPercent + "%");
            factItem.style.setProperty("--cursor-y", yPercent + "%");
            factItem.style.setProperty("--tilt-x", rotateY + "deg");
            factItem.style.setProperty("--tilt-y", rotateX + "deg");
        });

        factItem.addEventListener("pointerleave", function () {
            factItem.style.setProperty("--cursor-x", "50%");
            factItem.style.setProperty("--cursor-y", "50%");
            factItem.style.setProperty("--tilt-x", "0deg");
            factItem.style.setProperty("--tilt-y", "0deg");
        });
    });

    const factItems = Array.from(document.querySelectorAll(".fun-facts-list li"));
    const randomFactButton = document.querySelector("#random-fact-button");
    const randomFactText = document.querySelector("#random-fact-text");

    if (randomFactButton && randomFactText && factItems.length > 0) {
        const facts = factItems.map(function (item) {
            return item.textContent.trim().replace(/\s+/g, " ");
        });
        let lastFactIndex = -1;

        randomFactButton.addEventListener("click", function () {
            let nextFactIndex = Math.floor(Math.random() * facts.length);

            if (facts.length > 1) {
                while (nextFactIndex === lastFactIndex) {
                    nextFactIndex = Math.floor(Math.random() * facts.length);
                }
            }

            lastFactIndex = nextFactIndex;
            randomFactText.textContent = facts[nextFactIndex];
            randomFactText.classList.remove("is-changing");
            void randomFactText.offsetWidth;
            randomFactText.classList.add("is-changing");
        });
    }

    const quizQuestion = document.querySelector("#quiz-question");
    const quizOptions = document.querySelector("#quiz-options");
    const quizFeedback = document.querySelector("#quiz-feedback");
    const quizNext = document.querySelector("#quiz-next");

    if (quizQuestion && quizOptions && quizFeedback && quizNext) {
        const quizQuestions = [
            {
                question: "How many tiny pores can an egg shell have?",
                options: ["Up to 17,000", "About 200", "Only 12"],
                answer: "Up to 17,000"
            },
            {
                question: "Why are eggs checked before packaging?",
                options: ["To remove cracked eggs", "To change their colour", "To make them heavier"],
                answer: "To remove cracked eggs"
            },
            {
                question: "Which bird lays the largest eggs?",
                options: ["Ostrich", "Hummingbird", "Chicken"],
                answer: "Ostrich"
            },
            {
                question: "What gives egg shells much of their strength?",
                options: ["Their curved shape", "Their smell", "Their colour"],
                answer: "Their curved shape"
            }
        ];
        let quizIndex = 0;
        let answered = false;

        function showQuizQuestion() {
            const currentQuestion = quizQuestions[quizIndex];
            answered = false;
            quizQuestion.textContent = currentQuestion.question;
            quizFeedback.textContent = "";
            quizFeedback.className = "quiz-feedback";
            quizOptions.innerHTML = "";

            currentQuestion.options.forEach(function (option) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "quiz-option";
                button.textContent = option;

                button.addEventListener("click", function () {
                    if (answered) {
                        return;
                    }

                    answered = true;
                    const optionButtons = quizOptions.querySelectorAll(".quiz-option");
                    optionButtons.forEach(function (optionButton) {
                        optionButton.disabled = true;

                        if (optionButton.textContent === currentQuestion.answer) {
                            optionButton.classList.add("is-correct");
                        }
                    });

                    if (option === currentQuestion.answer) {
                        quizFeedback.textContent = "Correct! Nice egg knowledge.";
                        quizFeedback.classList.add("success");
                    } else {
                        button.classList.add("is-incorrect");
                        quizFeedback.textContent = "Not quite. The correct answer is: " + currentQuestion.answer + ".";
                        quizFeedback.classList.add("error");
                    }
                });

                quizOptions.appendChild(button);
            });
        }

        quizNext.addEventListener("click", function () {
            quizIndex = (quizIndex + 1) % quizQuestions.length;
            showQuizQuestion();
        });

        showQuizQuestion();
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
