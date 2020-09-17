export class GalleryMobile {

  init() {

    const galleryContainer = document.getElementById('gallery-container');
    const images = document.querySelectorAll('.image--item');
    const imagesNumber = galleryContainer.children.length;
    const sliderControlsContainer = document.getElementById('slider--controls');

    let x0 = null;
    let imageIndex = 0;

    galleryContainer.style.setProperty('--n', imagesNumber);

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

      galleryContainer.classList.toggle('smooth', !(locked = true))
    };

    const drag = (e) => {
      e.preventDefault();

      if (locked)
        galleryContainer.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
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
          galleryContainer.style.setProperty('--i', imageIndex -= s);
          f = 1 - f;
        }

        galleryContainer.style.setProperty('--tx', '0px');
        galleryContainer.style.setProperty('--f', f);
        galleryContainer.classList.toggle('smooth', !(locked = false));
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

    galleryContainer.addEventListener('mousedown', lock, false);
    galleryContainer.addEventListener('touchstart', lock, false);
    galleryContainer.addEventListener('mouseup', move, false);
    galleryContainer.addEventListener('touchend', move, false);
    galleryContainer.addEventListener('mousemove', drag, false);
    galleryContainer.addEventListener('touchmove', drag, false);

    activateSliderControlBackground();

  }
}
