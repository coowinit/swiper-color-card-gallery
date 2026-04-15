const colorGroups = [
  {
    id: 'cedar',
    name: 'Cedar / 雪松',
    swatch: './assets/images/swatches/cedar.svg',
    previewColor: '#b99450',
    images: ['cedar-1.svg', 'cedar-2.svg', 'cedar-3.svg', 'cedar-4.svg']
  },
  {
    id: 'red-wood',
    name: 'Red Wood / 红木',
    swatch: './assets/images/swatches/red-wood.svg',
    previewColor: '#b45134',
    images: ['red-wood-1.svg', 'red-wood-2.svg', 'red-wood-3.svg', 'red-wood-4.svg']
  },
  {
    id: 'teak',
    name: 'Teak / 柚木',
    swatch: './assets/images/swatches/teak.svg',
    previewColor: '#98643c',
    images: ['teak-1.svg', 'teak-2.svg', 'teak-3.svg', 'teak-4.svg']
  },
  {
    id: 'ash-wood',
    name: 'Ash Wood / 水曲柳',
    swatch: './assets/images/swatches/ash-wood.svg',
    previewColor: '#af9b87',
    images: ['ash-wood-1.svg', 'ash-wood-2.svg', 'ash-wood-3.svg', 'ash-wood-4.svg']
  },
  {
    id: 'red-brown',
    name: 'Red Brown / 红棕色',
    swatch: './assets/images/swatches/red-brown.svg',
    previewColor: '#7d4129',
    images: ['red-brown-1.svg', 'red-brown-2.svg', 'red-brown-3.svg', 'red-brown-4.svg']
  },
  {
    id: 'coffee',
    name: 'Coffee / 咖啡色',
    swatch: './assets/images/swatches/coffee.svg',
    previewColor: '#493730',
    images: ['coffee-1.svg', 'coffee-2.svg', 'coffee-3.svg', 'coffee-4.svg']
  },
  {
    id: 'blue-black',
    name: 'Blue Black / 蓝黑',
    swatch: './assets/images/swatches/blue-black.svg',
    previewColor: '#383d52',
    images: ['blue-black-1.svg', 'blue-black-2.svg', 'blue-black-3.svg', 'blue-black-4.svg']
  },
  {
    id: 'stone-grey',
    name: 'Stone Grey / 石灰',
    swatch: './assets/images/swatches/stone-grey.svg',
    previewColor: '#696c71',
    images: ['stone-grey-1.svg', 'stone-grey-2.svg', 'stone-grey-3.svg', 'stone-grey-4.svg']
  },
  {
    id: 'smoke-grey',
    name: 'Smoke Grey / 烟灰',
    swatch: './assets/images/swatches/smoke-grey.svg',
    previewColor: '#8a8a82',
    images: ['smoke-grey-1.svg', 'smoke-grey-2.svg', 'smoke-grey-3.svg', 'smoke-grey-4.svg']
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
