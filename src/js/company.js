export class Company {
  constructor() {
    this.img = document.getElementById('bela-come-img');
    this.animateImage();
  }

  animateImage() {
    const triggerBottom = window.innerHeight / 2;

    window.addEventListener('scroll', (e) => {
      const imgTop = this.img.getBoundingClientRect().top;

      imgTop < triggerBottom
        ? this.img.classList.add('show')
        : this.img.classList.remove('show');
    });
  }
}
