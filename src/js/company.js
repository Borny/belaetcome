export class Company {

  constructor() {
    this.img = document.getElementById('bela-come-img');
  }

  animateImage() {
    const triggerBottom = window.innerHeight / 2;

    window.addEventListener('scroll', (e) => {
      const imgTop = this.img.getBoundingClientRect().top;

      if (imgTop < triggerBottom) {
        this.img.classList.add('show');
      } else {
        this.img.classList.remove('show');
      }
    });
  }

}