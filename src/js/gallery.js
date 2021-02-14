export class GalleryMobile {

  constructor() {
    this.galleryContainer = document.getElementById('gallery-container');
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
