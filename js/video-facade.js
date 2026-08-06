document.querySelectorAll('.c-video__facade').forEach((facade) => {
  const column = facade.closest('.l-section__content') || document.body;

  const overlay = document.createElement('div');
  overlay.className = 'c-video-overlay';
  overlay.hidden = true;

  const box = document.createElement('div');
  box.className = 'c-video-overlay__box';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'c-video-overlay__close';
  closeBtn.setAttribute('aria-label', 'Chiudi');
  closeBtn.textContent = '×';

  overlay.appendChild(box);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  function updateBounds() {
    const rect = column.getBoundingClientRect();
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
  }

  function openOverlay() {
    updateBounds();

    const thumbnailSrc = facade.querySelector('.c-video__thumbnail').src;
    const thumbnail = document.createElement('img');
    thumbnail.className = 'c-video-overlay__thumbnail';
    thumbnail.src = thumbnailSrc;
    thumbnail.alt = '';

    const spinner = document.createElement('div');
    spinner.className = 'c-video-overlay__spinner';

    const iframe = document.createElement('iframe');
    iframe.className = 'c-video__iframe';
    iframe.src = facade.dataset.src;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.addEventListener('load', () => {
      iframe.classList.add('is-loaded');
      spinner.remove();
    });

    box.innerHTML = '';
    box.appendChild(thumbnail);
    box.appendChild(spinner);
    box.appendChild(iframe);
    overlay.hidden = false;
  }

  function closeOverlay() {
    overlay.hidden = true;
    box.innerHTML = '';
  }

  facade.addEventListener('click', openOverlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  closeBtn.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closeOverlay();
  });

  window.addEventListener('resize', () => {
    if (!overlay.hidden) updateBounds();
  });
});
