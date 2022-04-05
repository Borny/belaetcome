import '../styles/medias.scss'

class Medias {
  constructor() {
    this.body = document.getElementById('body')
    this.initMedia()
  }

  initMedia() {

    const token = localStorage.getItem('token')

    if (!token) {
      location.replace('/code-login.html')
      return
    }
    this.body.classList.remove('hidden')
    this.body.style.opacity = 1
  }
}

new Medias()
