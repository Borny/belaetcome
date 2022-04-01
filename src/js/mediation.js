import '../styles/mediation.scss'

class Mediation {
  constructor() {
    this.initMediation()
  }

  initMediation() {
    const token = localStorage.getItem('token')
    if (!token) {
      location.replace('/code-login.html')
    }
  }
}

new Mediation()
