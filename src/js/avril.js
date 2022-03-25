export class Avril {
  constructor() {
    this.img = document.getElementById('avril-img')
    this.animateImage()
  }

  animateImage() {
    const triggerBottom = (window.innerHeight / 5) * 4

    window.addEventListener('scroll', (e) => {
      const imgTop = this.img.getBoundingClientRect().top
      imgTop < triggerBottom
        ? this.img.classList.add('show')
        : this.img.classList.remove('show')
    })
  }
}
