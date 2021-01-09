export class ContactForm {

  constructor() {
    this.btn = document.getElementById('submit-contact-btn')
    this.form = document.getElementById('contact-form');
    this.inputFields = document.querySelectorAll('.form__control');
    this.name = this.form.querySelector('#form-name');
    this.email = this.form.querySelector('#form-email');
    this.object = this.form.querySelector('#form-object');
    this.message = this.form.querySelector('#form-message');
    this.successMessage = document.getElementById('success-message');
    this.errorMessage = document.getElementById('error-message');
    this.submitContactBtn = document.getElementById('submit-contact-btn');
    this.loaderContact = document.getElementById('loader-contact');
  }

  isFormValid() {
    return this.name.validity.valid
      && this.email.validity.valid
      && this.object.validity.valid
      && this.message.validity.valid
  }

  // Clears the inputs on page load
  clearInputs() {
    this.inputFields.forEach(input => {
      input.value = '';
    })
  }

  async postContactFormData(event) {
    event.preventDefault(); // will prevent the page from reload on form submit 
    const formData = {
      name: this.name.value,
      email: this.email.value,
      object: this.object.value,
      message: this.message.value
    };

    // Show loader
    this.loaderContact.classList.remove('hidden');

    try {
      const res = await fetch(
        'http://localhost:9000/api/contact',
        // 'http://localhost:9000/api/contactffff',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      )
      if (res.status === 200) {
        this.loaderContact.classList.add('hidden');
        this.form.classList.add('hidden');
        this.successMessage.classList.remove('hidden');
      }
    } catch (error) {
      this.form.classList.remove('hidden');
      this.errorMessage.classList.remove('hidden');
      this.loaderContact.classList.add('hidden');
      throw new Error('Something went wrong')
    }
  }

  submitForm() {
    this.form.addEventListener('submit', this.postContactFormData.bind(this));
  }

  focusOnInput(input) {

    this.isFormValid()
      ? this.submitContactBtn.removeAttribute('disabled')
      : this.submitContactBtn.setAttribute('disabled', 'disabled');

    if (input && input.target.value !== '') {
      input.target.parentNode.classList.add('filled');
      input.target.parentNode.nextElementSibling.classList.add('invisible');
    } else {
      input.target.parentNode.classList.remove('filled');
      input.target.parentNode.nextElementSibling.classList.remove('invisible');
    }
  }

  init() {
    this.clearInputs();

    // Goes through the array inputFields
    this.inputFields.forEach(input => {
      // Creates an event listener on the current input_field
      console.log('this:', this);
      input.addEventListener('input', this.focusOnInput.bind(this));
    })

    this.submitForm();
  }

}