const colorGroups = [
  {
    id: 'walnut',
    name: 'Walnut Brown',
    swatch: './assets/images/swatches/walnut.svg',
    previewColor: '#7a5843',
    images: ['walnut-1.svg', 'walnut-2.svg', 'walnut-3.svg', 'walnut-4.svg']
  },
  {
    id: 'cedar',
    name: 'Cedar Tone',
    swatch: './assets/images/swatches/cedar.svg',
    previewColor: '#8f6149',
    images: ['cedar-1.svg', 'cedar-2.svg', 'cedar-3.svg', 'cedar-4.svg']
  },
  {
    id: 'charcoal',
    name: 'Charcoal Black',
    swatch: './assets/images/swatches/charcoal.svg',
    previewColor: '#43474c',
    images: ['charcoal-1.svg', 'charcoal-2.svg', 'charcoal-3.svg', 'charcoal-4.svg']
  },
  {
    id: 'mist',
    name: 'Mist Grey',
    swatch: './assets/images/swatches/mist.svg',
    previewColor: '#a2a7ad',
    images: ['mist-1.svg', 'mist-2.svg', 'mist-3.svg', 'mist-4.svg']
  },
  {
    id: 'ivory',
    name: 'Ivory White',
    swatch: './assets/images/swatches/ivory.svg',
    previewColor: '#ddd3c2',
    images: ['ivory-1.svg', 'ivory-2.svg', 'ivory-3.svg', 'ivory-4.svg']
  },
  {
    id: 'riverstone',
    name: 'Riverstone Grey',
    swatch: './assets/images/swatches/riverstone.svg',
    previewColor: '#7d7a73',
    images: ['riverstone-1.svg', 'riverstone-2.svg', 'riverstone-3.svg', 'riverstone-4.svg']
  },
  {
    id: 'oak',
    name: 'Natural Oak',
    swatch: './assets/images/swatches/oak.svg',
    previewColor: '#aa8358',
    images: ['oak-1.svg', 'oak-2.svg', 'oak-3.svg', 'oak-4.svg']
  }
];

const swatchesEl = document.getElementById('swatches');
const swatchSwiperEl = document.getElementById('swatchSwiper');
const mainWrapper = document.getElementById('mainWrapper');
const thumbWrapper = document.getElementById('thumbWrapper');
const galleryTitle = document.getElementById('galleryTitle');
const gallerySubtitle = document.getElementById('gallerySubtitle');
const metaText = document.getElementById('metaText');

const state = {
  groupIndex: 0
};

let mainSwiper = null;
let thumbSwiper = null;
let swatchSwiper = null;
let resizeTimer = null;

function currentGroup() {
  return colorGroups[state.groupIndex];
}

function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function imagePath(fileName) {
  return `./assets/images/scenes/${fileName}`;
}

function renderSwatches() {
  swatchesEl.innerHTML = colorGroups.map((group, index) => {
    const isActive = index === state.groupIndex;

    return `
      <div class="swiper-slide">
        <button
          class="swatch ${isActive ? 'active' : ''}"
          type="button"
          data-index="${index}"
          aria-label="切换到 ${group.name}"
          aria-pressed="${isActive ? 'true' : 'false'}"
        >
          <img class="swatch__image" src="${group.swatch}" alt="${group.name}">
          <span class="swatch__veil" aria-hidden="true">
            <span class="swatch__tone" style="background:${group.previewColor};"></span>
          </span>
          <span class="swatch__check" aria-hidden="true"></span>
        </button>
      </div>
    `;
  }).join('');

  updateSwatchPosition();
}

function updateSwatchPosition(speed = 300) {
  if (isMobile()) {
    if (swatchSwiper) {
      swatchSwiper.slideTo(state.groupIndex, speed);
    }
    return;
  }

  if (swatchSwiperEl) {
    swatchSwiperEl.scrollLeft = 0;
  }
}

function initSwatchSwiper() {
  const mobile = isMobile();

  if (swatchSwiper) {
    swatchSwiper.destroy(true, true);
    swatchSwiper = null;
  }

  if (!mobile) return;

  swatchSwiper = new Swiper('#swatchSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: false,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    slideToClickedSlide: true,
    resistanceRatio: 0.85
  });

  swatchSwiper.slideTo(state.groupIndex, 0, false);
}

function destroyGallerySwipers() {
  if (mainSwiper) {
    mainSwiper.destroy(true, true);
    mainSwiper = null;
  }

  if (thumbSwiper) {
    thumbSwiper.destroy(true, true);
    thumbSwiper = null;
  }
}

function renderGallery() {
  const group = currentGroup();

  galleryTitle.textContent = group.name;
  gallerySubtitle.textContent = `当前色卡：${group.name}`;
  metaText.textContent = `${group.images.length} 张场景图`;

  mainWrapper.innerHTML = group.images.map((fileName, index) => {
    const src = imagePath(fileName);
    return `
      <div class="swiper-slide">
        <img src="${src}" alt="${group.name} 场景图 ${index + 1}">
      </div>
    `;
  }).join('');

  thumbWrapper.innerHTML = group.images.map((fileName, index) => {
    const src = imagePath(fileName);
    return `
      <div class="swiper-slide" aria-label="缩略图 ${index + 1}">
        <img src="${src}" alt="${group.name} 缩略图 ${index + 1}">
      </div>
    `;
  }).join('');

  destroyGallerySwipers();

  thumbSwiper = new Swiper('#thumbSwiper', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      0: { spaceBetween: 8 },
      768: { spaceBetween: 10 }
    }
  });

  mainSwiper = new Swiper('#mainSwiper', {
    spaceBetween: 12,
    speed: 500,
    loop: false,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.nav-btn.next',
      prevEl: '.nav-btn.prev'
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    thumbs: {
      swiper: thumbSwiper
    }
  });
}

function refreshLayout() {
  initSwatchSwiper();

  if (mainSwiper) mainSwiper.update();
  if (thumbSwiper) thumbSwiper.update();
  if (swatchSwiper) swatchSwiper.update();

  updateSwatchPosition(0);
}

swatchesEl.addEventListener('click', (event) => {
  const button = event.target.closest('.swatch');
  if (!button) return;

  const nextIndex = Number(button.dataset.index);
  if (Number.isNaN(nextIndex) || nextIndex === state.groupIndex) return;

  state.groupIndex = nextIndex;
  renderSwatches();
  renderGallery();
  updateSwatchPosition();
});

window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(refreshLayout, 120);
});

window.addEventListener('orientationchange', () => {
  window.setTimeout(refreshLayout, 180);
});

renderSwatches();
renderGallery();
initSwatchSwiper();
