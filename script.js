// Remover a lógica de simulação de envio de formulário.
// O restante do script (menu mobile, lightbox, ano do footer) permanece o mesmo.

document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Menu Logic ===
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
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
            if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && menuToggle && !menuToggle.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    } else {
        console.error("Mobile menu elements not found!");
    }

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

    if (lightbox && lightboxImg && lightboxCaption && lightboxClose && lightboxPrev && lightboxNext && galleryImages.length > 0) {
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
         // Silently fail or log if lightbox elements are missing or no gallery images found
         if (!lightbox || !lightboxImg || !lightboxCaption || !lightboxClose || !lightboxPrev || !lightboxNext) {
            console.error("Lightbox elements not found!");
         }
         // console.log("No gallery images found for lightbox.");
    }


    // === Form Feedback Simulation Logic REMOVED ===
    // const contactForm = document.getElementById('contact-form');
    // const successMessage = document.getElementById('form-success-message');
    // const errorMessage = document.getElementById('form-error-message');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (event) => {
    //         // event.preventDefault(); // REMOVIDO - Deixar o form ser enviado para o FormSubmit
    //         // Lógica de simulação removida
    //     });
    // }

}); // End of DOMContentLoaded