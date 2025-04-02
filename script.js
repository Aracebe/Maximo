// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- Mobile Menu Toggle Functionality ---
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const navLinks = mainNav.querySelectorAll('a');
if (menuToggle && mainNav) {
     menuToggle.addEventListener('click', () => {
        const isActive = mainNav.classList.toggle('is-active');
        menuToggle.classList.toggle('is-active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-active')) {
                 mainNav.classList.remove('is-active');
                 menuToggle.classList.remove('is-active');
                 menuToggle.setAttribute('aria-expanded', 'false');
                 menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    });
 }

// --- Lightbox Functionality (Desktop Only) ---
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const galleryLinks = document.querySelectorAll('a[data-lightbox="gallery-group"]');
const bodyElement = document.body;

function openLightbox(event) {
    if (window.innerWidth < 769) { return; } // Não abrir lightbox em mobile/tablet
    event.preventDefault();
    const imgSrc = event.currentTarget.getAttribute('href');
    const imgAlt = event.currentTarget.querySelector('img')?.getAttribute('alt') || 'Imagem da galeria';
    lightboxImage.setAttribute('src', imgSrc);
    lightboxImage.setAttribute('alt', `Imagem ampliada: ${imgAlt}`);
    lightboxOverlay.classList.add('is-active');
    bodyElement.classList.add('lightbox-open'); // Impede scroll do body
    lightboxCloseBtn.focus(); // Foco no botão de fechar
}
function closeLightbox() {
    lightboxOverlay.classList.remove('is-active');
    bodyElement.classList.remove('lightbox-open'); // Libera scroll do body
    // Opcional: devolver o foco para o link que abriu o lightbox
    // (requer guardar a referência do link clicado)
}
if(lightboxOverlay && lightboxImage && lightboxCloseBtn && galleryLinks.length > 0) {
     galleryLinks.forEach(link => { link.addEventListener('click', openLightbox); });
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    // Fechar clicando fora da imagem
    lightboxOverlay.addEventListener('click', (event) => {
         if (event.target === lightboxOverlay) {
             closeLightbox();
         }
    });
    // Fechar com a tecla Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightboxOverlay.classList.contains('is-active')) {
            closeLightbox();
        }
    });
 }