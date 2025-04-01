document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Menu Logic ===
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const body = document.body; // Get body inside DOMContentLoaded

    // Check if essential elements exist before proceeding
    if (!menuToggle || !navLinks) {
        console.error("Mobile menu elements not found!");
        return; // Stop script execution if menu elements are missing
    }

    const navLinkItems = navLinks.querySelectorAll('.nav-link');

    const closeMenu = () => {
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        body.style.overflow = '';
      }
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active', isActive);
        menuToggle.setAttribute('aria-expanded', isActive);
        body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        // Check if navLinks exists before accessing its properties
        if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && menuToggle && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // === Footer Year Update ===
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // === Lightbox Logic ===
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Check if lightbox elements exist
    if (lightbox && lightboxImg && lightboxCaption && lightboxClose && lightboxPrev && lightboxNext) {
        let currentImageIndex;
        const imagesData = Array.from(galleryImages).map(img => ({ src: img.src, alt: img.alt }));

        const openLightbox = (index) => {
            if (index < 0 || index >= imagesData.length) return;
            currentImageIndex = index;
            lightboxImg.src = imagesData[currentImageIndex].src;
            lightboxCaption.textContent = imagesData[currentImageIndex].alt;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
            updateLightboxNav();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            body.style.overflow = '';
        };

        const showPrevImage = () => {
            openLightbox((currentImageIndex - 1 + imagesData.length) % imagesData.length);
        };

        const showNextImage = () => {
            openLightbox((currentImageIndex + 1) % imagesData.length);
        };

         const updateLightboxNav = () => {
             lightboxPrev.style.display = imagesData.length > 1 ? 'block' : 'none';
             lightboxNext.style.display = imagesData.length > 1 ? 'block' : 'none';
         };

        galleryImages.forEach((img, index) => {
            // Ensure data-index matches the actual index for safety
            img.dataset.index = index;
            img.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', showPrevImage);
        lightboxNext.addEventListener('click', showNextImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (lightbox.classList.contains('active')) {
                 if (event.key === 'Escape') {
                    closeLightbox();
                } else if (event.key === 'ArrowLeft' && imagesData.length > 1) {
                    showPrevImage();
                } else if (event.key === 'ArrowRight' && imagesData.length > 1) {
                    showNextImage();
                }
            }
        });
    } else {
         console.error("Lightbox elements not found!");
    }


    // === Form Feedback Simulation Logic ===
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');
    const errorMessage = document.getElementById('form-error-message');

    if (contactForm && successMessage && errorMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            console.log('Form submitted (simulation)');
            // Simulate success
            setTimeout(() => {
                successMessage.style.display = 'block';
                // contactForm.reset(); // Optional: Clear form on success
            }, 500);
            // Simulate error (for testing):
            // setTimeout(() => {
            //     errorMessage.style.display = 'block';
            // }, 500);
        });
    } else {
         console.error("Contact form elements not found!");
    }

}); // End of DOMContentLoaded