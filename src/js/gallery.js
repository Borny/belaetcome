export class GalleryMobile {

  constructor() {
    this.galleryContainer = document.getElementById('gallery-container');
    this.carouselDesktop = document.getElementById('carousel-desktop');
    this.carousel = document.getElementById('carousel--desktop');
    this.gallery = document.getElementById('gallery--desktop');
    this.btnLeft = document.getElementById('btn-carousel-left');
    this.btnRight = document.getElementById('btn-carousel-right');
    this.galleryItems = this.gallery.querySelectorAll('.gallery__item');
    this.imgHighlightIdx = this.galleryItems.length - 1;
    this.carouselWidth = this.carousel.offsetWidth;
    this.imgWidth = this.carouselWidth / 5;
    this.galleryLength = this.galleryItems.length;
    this.idx = 0;
    this.visibleImgRange = 5;
  }

  animateImage() {
    const triggerBottom = window.innerHeight / 2;

    window.addEventListener('scroll', (e) => {
      const galleryContainerTop = this.galleryContainer.getBoundingClientRect().top;

      if (galleryContainerTop < triggerBottom) {
        this.galleryContainer.classList.add('show');
      } else {
        this.galleryContainer.classList.remove('show');
        this.galleryContainer.classList.remove('smooth');
      }
    });

    window.addEventListener('scroll', (e) => {
      const carouselContainerTop = this.carouselDesktop.getBoundingClientRect().top;

      if (carouselContainerTop < triggerBottom) {
        this.carouselDesktop.classList.add('show');
      } else {
        this.carouselDesktop.classList.remove('show');
      }
    });
  }

  initCarousel() {

    // Setting the images size
    this.galleryItems.forEach(item => item.style.width = `${this.imgWidth}px`);
    this.galleryItems.forEach(item => item.style.height = `${this.imgWidth}px`);

    // Highlighting the first image
    this.galleryItems[this.imgHighlightIdx].classList.add('hightlight');

    // Disabling the left button by default
    this.btnLeft.setAttribute('disabled', true);
    this.toggleImageVisibility();

    // RIGHT BUTTON
    this.btnLeft.addEventListener('click', () => {
      this.idx--;
      this.imgHighlightIdx++;
      this.changeImage();
      this.btnRight.removeAttribute('disabled');
      if (this.idx <= 0) {
        this.btnLeft.setAttribute('disabled', true);
      }
    })

    // LEFT BUTTON
    this.btnRight.addEventListener('click', () => {
      this.idx++;
      this.imgHighlightIdx--;
      this.changeImage();
      this.btnLeft.removeAttribute('disabled');
      if (this.idx >= this.galleryLength - 1) {
        this.btnRight.setAttribute('disabled', true);
      }
    })

  }

  changeImage() {
    if (this.idx > this.galleryLength - 5) {
      this.highlightImg();
      return;
    }

    this.transformImgContainer();
    this.highlightImg();
    this.toggleImageVisibility();
  }

  transformImgContainer() {
    this.gallery.style.transform = `translateX(-${this.imgWidth * this.idx}px)`;
  }

  highlightImg() {
    this.galleryItems.forEach(item => item.classList.remove('hightlight'));
    this.galleryItems[this.imgHighlightIdx].classList.add('hightlight');
  }

  toggleImageVisibility() {
    this.galleryItems.forEach((item, idx) => {
      if (idx > this.imgHighlightIdx || idx < this.imgHighlightIdx - 4) {
        item.classList.add('hide');
      } else {
        item.classList.remove('hide');
      }
    })
  }

  init() {

    const images = document.querySelectorAll('.image--item');
    const imagesNumber = this.galleryContainer.children.length;
    const sliderControlsContainer = document.getElementById('slider--controls');

    let x0 = null;
    let imageIndex = 0;

    this.galleryContainer.style.setProperty('--n', imagesNumber);

    const activateSliderControlBackground = () => {
      const sliderControls = document.querySelectorAll('.slider--control');

      let activeControl;
      sliderControls.forEach((control, index) => {
        if (index === imageIndex) {
          activeControl = control;
          activeControl.classList.add('active');
        } else {
          control.classList.remove('active');
        }
      })
    }

    const unify = e => e.changedTouches ? e.changedTouches[0] : e;

    let locked = false;

    const lock = (e) => {
      x0 = unify(e).clientX;

      this.galleryContainer.classList.toggle('smooth', !(locked = true))
    };

    const drag = (e) => {
      e.preventDefault();

      if (locked)
        this.galleryContainer.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    };

    let w;
    const size = () => {
      w = window.innerWidth
    }

    const move = (e) => {
      if (locked) {
        let
          dx = unify(e).clientX - x0,
          s = Math.sign(dx),
          f = +(s * dx / w).toFixed(2);

        if ((imageIndex > 0 || s < 0) && (imageIndex < imagesNumber - 1 || s > 0) && f > .2) {
          this.galleryContainer.style.setProperty('--i', imageIndex -= s);
          f = 1 - f;
        }

        this.galleryContainer.style.setProperty('--tx', '0px');
        this.galleryContainer.style.setProperty('--f', f);
        this.galleryContainer.classList.toggle('smooth', !(locked = false));
        x0 = null
      }
      activateSliderControlBackground();
    };

    size();

    addEventListener('resize', size, false);

    // Creating the slider controls
    images.forEach(() => {
      const sliderControlElement = document.createElement('span');
      sliderControlElement.classList.add('slider--control');
      sliderControlsContainer.appendChild(sliderControlElement);
    })

    this.galleryContainer.addEventListener('mousedown', lock, false);
    this.galleryContainer.addEventListener('touchstart', lock, false);
    this.galleryContainer.addEventListener('mouseup', move, false);
    this.galleryContainer.addEventListener('touchend', move, false);
    this.galleryContainer.addEventListener('mousemove', drag, false);
    this.galleryContainer.addEventListener('touchmove', drag, false);

    activateSliderControlBackground();

  }
}
