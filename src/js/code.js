import '../styles/code.scss'

class CodeLogin {
  constructor() {
    this.codeForm = document.getElementById('code-form')
    this.codes = document.querySelectorAll('.code')
    this.validationBtn = document.getElementById('validation-btn')
    this.loaderValidationCode = document.getElementById(
      'loader-validation-code'
    )
    this.errorMessage = document.getElementById('error-message')
    this.checkToken()
    this.initForm()
    this.clearInputs()
  }

  isFormValid() {
    let isValid
    this.codes.forEach((input) => {
      isValid = input.validity.valid
      if (!input.validity.valid) {
        isValid = false
      }
    })

    return isValid
  }

  // Clears the inputs on page load
  clearInputs() {
    this.codes.forEach((input) => {
      input.value = ''
    })
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      location.replace('/medias.html')
      return
    }
  }

  async postAuthenticationFormData(data) {
    console.log('auth', data)

    this.errorMessage.classList.add('hidden')
    // Show loader
    this.loaderValidationCode.classList.remove('hidden')

    try {
      const res = await fetch(
        'https://belaetcome.herokuapp.com/api/auth',
        // 'http://localhost:9000/api/auth',
        // 'http://localhost:9000/api/contactffff',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userCode: data }),
        }
      )
      // hide loader

      const responseData = await res.json()

      console.log('responseData', responseData)

      if (responseData.message === 'success') {
        this.loaderValidationCode.classList.add('hidden')
        localStorage.setItem('token', responseData.token)
        location.replace('/medias.html')
      } else {
        this.errorMessage.classList.remove('hidden')
        this.loaderValidationCode.classList.add('hidden')
      }
    } catch (error) {
      // Hide loader
      this.loaderValidationCode.classList.add('hidden')
      console.error('Auth failed', error)
      // hide loader
    }
  }

  initForm() {




    this.initInputs()

    this.codeForm.addEventListener('submit', (e) => {
      e.preventDefault()

      if (!this.isFormValid) {
        return
      }

      let authCode = ''
      console.log(this.isFormValid())

      this.codes.forEach((code) => {
        console.log(code.value)
        authCode += code.value
        code.focus()
        console.log(authCode)
      })
      console.log('codes value', this.codeForm)

      document.activeElement.blur()

      this.postAuthenticationFormData(authCode)
    })
  }

  initInputs() {
    console.log('sdmlfkqsfdmlkj')
    this.codes[0].focus()

    console.log(this.codes)

    this.codes.forEach((code, idx) => {
      code.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) {
          this.codes[idx].value = ''
        }
      })
    })

    this.codes.forEach((code, idx) => {
      code.addEventListener('keyup', (e) => {
        if (e.key >= 0 && e.key <= 9 && idx < this.codes.length - 1) {
          this.codes[idx + 1].focus()
        } else if (e.key === 'Backspace' && idx !== 0) {
          this.codes[idx - 1].focus()
        }

        console.log(this.isFormValid())
        this.isFormValid()
          ? this.validationBtn.removeAttribute('disabled')
          : this.validationBtn.setAttribute('disabled', true)
      })
    })
  }
}

window.addEventListener('load', () => {
  new CodeLogin()
})
