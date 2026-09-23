(() => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const willOpen = mobileMenu.hasAttribute('hidden');
      mobileMenu.toggleAttribute('hidden', !willOpen);
      burger.setAttribute('aria-expanded', String(willOpen));
      burger.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const service = document.getElementById('service-select').value;
      const car = document.getElementById('car-input').value.trim();
      if (!service) return;
      const text = `Здравствуйте! Хочу уточнить стоимость работ в SV Авто.\nЗадача: ${service}.${car ? `\nАвтомобиль: ${car}.` : ''}\nМогу отправить фотографии повреждения.`;
      window.open(`https://wa.me/79952242818?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  const images = [["assets/photos/work-01.jpg", "Работа SV Авто — фото 1"], ["assets/photos/work-02.jpg", "Работа SV Авто — фото 2"], ["assets/photos/work-03.jpg", "Работа SV Авто — фото 3"], ["assets/photos/work-04.jpg", "Работа SV Авто — фото 4"], ["assets/photos/work-05.jpg", "Работа SV Авто — фото 5"], ["assets/photos/work-06.jpg", "Работа SV Авто — фото 6"], ["assets/photos/work-07.jpg", "Работа SV Авто — фото 7"], ["assets/photos/work-08.jpg", "Работа SV Авто — фото 8"], ["assets/photos/work-09.jpg", "Работа SV Авто — фото 9"], ["assets/photos/work-10.jpg", "Работа SV Авто — фото 10"], ["assets/photos/work-11.jpg", "Работа SV Авто — фото 11"], ["assets/photos/work-12.jpg", "Работа SV Авто — фото 12"], ["assets/photos/work-13.jpg", "Работа SV Авто — фото 13"], ["assets/photos/work-14.jpg", "Работа SV Авто — фото 14"], ["assets/photos/work-15.jpg", "Работа SV Авто — фото 15"], ["assets/photos/work-16.jpg", "Работа SV Авто — фото 16"], ["assets/photos/work-17.jpg", "Работа SV Авто — фото 17"], ["assets/photos/work-18.jpg", "Работа SV Авто — фото 18"], ["assets/photos/work-19.jpg", "Работа SV Авто — фото 19"], ["assets/photos/work-20.jpg", "Работа SV Авто — фото 20"], ["assets/photos/work-21.jpg", "Работа SV Авто — фото 21"], ["assets/photos/work-22.jpg", "Работа SV Авто — фото 22"], ["assets/photos/work-23.jpg", "Работа SV Авто — фото 23"], ["assets/photos/work-24.jpg", "Работа SV Авто — фото 24"], ["assets/photos/work-25.jpg", "Работа SV Авто — фото 25"], ["assets/photos/work-26.jpg", "Работа SV Авто — фото 26"], ["assets/photos/work-27.jpg", "Работа SV Авто — фото 27"], ["assets/photos/work-28.jpg", "Работа SV Авто — фото 28"], ["assets/photos/work-29.jpg", "Работа SV Авто — фото 29"], ["assets/photos/work-30.jpg", "Работа SV Авто — фото 30"], ["assets/photos/work-31.jpg", "Работа SV Авто — фото 31"], ["assets/photos/work-32.jpg", "Работа SV Авто — фото 32"], ["assets/photos/work-33.jpg", "Работа SV Авто — фото 33"], ["assets/photos/work-34.jpg", "Работа SV Авто — фото 34"], ["assets/photos/work-35.jpg", "Работа SV Авто — фото 35"], ["assets/photos/work-36.jpg", "Работа SV Авто — фото 36"], ["assets/photos/work-37.jpg", "Работа SV Авто — фото 37"], ["assets/photos/work-38.jpg", "Работа SV Авто — фото 38"], ["assets/photos/work-39.jpg", "Работа SV Авто — фото 39"], ["assets/photos/work-40.jpg", "Работа SV Авто — фото 40"], ["assets/photos/work-41.jpg", "Работа SV Авто — фото 41"], ["assets/photos/work-42.jpg", "Работа SV Авто — фото 42"], ["assets/photos/work-43.jpg", "Работа SV Авто — фото 43"], ["assets/photos/work-44.jpg", "Работа SV Авто — фото 44"], ["assets/photos/work-45.jpg", "Работа SV Авто — фото 45"]];
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const counter = document.getElementById('lightbox-counter');
  let current = 0;
  let previousFocus = null;

  if (lightbox && lightboxImg && counter) {
    const render = () => {
      const [src, alt] = images[current];
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      counter.textContent = `${current + 1} / ${images.length}`;
    };
    const openAt = index => {
      previousFocus = document.activeElement;
      current = Math.max(0, Math.min(images.length - 1, Number(index) || 0));
      render();
      lightbox.removeAttribute('hidden');
      document.body.classList.add('lightbox-open');
      lightbox.querySelector('.lightbox__close')?.focus();
    };
    const close = () => {
      lightbox.setAttribute('hidden','');
      document.body.classList.remove('lightbox-open');
      previousFocus?.focus?.();
    };
    document.querySelectorAll('.gallery-open').forEach(btn => btn.addEventListener('click', () => openAt(btn.dataset.index)));
    document.getElementById('open-all-works')?.addEventListener('click', () => openAt(0));
    lightbox.querySelector('.lightbox__close')?.addEventListener('click', close);
    lightbox.querySelector('.lightbox__prev')?.addEventListener('click', () => { current=(current-1+images.length)%images.length; render(); });
    lightbox.querySelector('.lightbox__next')?.addEventListener('click', () => { current=(current+1)%images.length; render(); });
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (lightbox.hasAttribute('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') { current=(current-1+images.length)%images.length; render(); }
      if (e.key === 'ArrowRight') { current=(current+1)%images.length; render(); }
    });
  }
})();
