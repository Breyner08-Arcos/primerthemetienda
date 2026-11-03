// Swiper is limited to the global promotion strip. The home banner is static.
if (!customElements.get('store-promotions')) {
  customElements.define('store-promotions', class extends HTMLElement {
    connectedCallback() {
      if (!window.Swiper) return;
      this.button = this.querySelector('button');
      this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.paused = this.motionPreference.matches;
      this.controller = new AbortController();
      const options = { signal: this.controller.signal };
      const syncSlides = (swiper) => {
        swiper.slides.forEach((slide, index) => {
          const inactive = index !== swiper.activeIndex;
          slide.setAttribute('aria-hidden', String(inactive));
          slide.inert = inactive;
        });
      };
      this.slider = new window.Swiper(this.querySelector('.swiper-container'), {
        slidesPerView: 1,
        loop: true,
        speed: this.motionPreference.matches ? 0 : 650,
        autoplay: { delay: 5000, disableOnInteraction: false },
        a11y: { slideLabelMessage: 'Promoción {{index}} de {{slidesLength}}' },
        on: { init: syncSlides, slideChange: syncSlides },
      });
      this.button.hidden = false;
      this.button.addEventListener('click', () => {
        this.paused = !this.paused;
        this.update();
      }, options);
      this.addEventListener('mouseenter', () => this.slider.autoplay.stop(), options);
      this.addEventListener('mouseleave', () => this.start(), options);
      this.addEventListener('focusin', () => this.slider.autoplay.stop(), options);
      this.addEventListener('focusout', () => queueMicrotask(() => this.start()), options);
      document.addEventListener('visibilitychange', () => this.start(), options);
      this.motionPreference.addEventListener('change', () => {
        this.slider.params.speed = this.motionPreference.matches ? 0 : 650;
        this.paused = this.motionPreference.matches;
        this.update();
      }, options);
      this.update();
    }
    update() {
      this.button.textContent = this.paused ? '▷' : 'Ⅱ';
      this.button.setAttribute('aria-label', this.paused ? 'Reanudar promociones' : 'Pausar promociones');
      this.button.setAttribute('aria-pressed', String(this.paused));
      this.start();
    }
    start() {
      if (!this.isConnected || !this.slider) return;
      this.slider.autoplay.stop();
      if (this.paused || document.hidden || this.matches(':hover') || this.contains(document.activeElement)) return;
      this.slider.autoplay.start();
    }
    disconnectedCallback() {
      this.controller?.abort();
      this.slider?.destroy(true, true);
      this.slider = null;
    }
  });
}
