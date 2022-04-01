import '../styles/medias.scss'

class Medias {
  constructor() {
    this.initMedia()
  }

  initMedia() {
    console.log('medias page')


    const token = localStorage.getItem('token')
    if (!token) {
      location.replace('/code-login.html')
    }
  }
}

new Medias()
