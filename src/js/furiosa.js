export class Furiosa {

  constructor() {
    this.img = document.getElementById('furiosa-img');
  }

  animateImage() {
    const triggerBottom = window.innerHeight / 5 * 4;

    window.addEventListener('scroll', (e) => {
      const imgTop = this.img.getBoundingClientRect().top;
      if (imgTop < triggerBottom) {
        this.img.classList.add('show');
      }
    });
  }

}