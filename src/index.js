import './styles/main.scss';

//////////////////////
// MOBILE NAV TOGGLE
//////////////////////

const mobileNav = document.getElementById('mobile-nav');
const toggleNavBtn = document.getElementById('toggle-nav-btn');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.menu__link');

const toggleMobileNav = () => {
  console.log('click')
  mobileNav.classList.toggle('open');
}

toggleNavBtn.addEventListener('click', toggleMobileNav);
mobileNavOverlay.addEventListener('click', toggleMobileNav);
mobileNavLinks.forEach(link => {
  link.addEventListener('click', toggleMobileNav)
})

/////////
// FORM
/////////

// INPUT LABEL ANIMATION
// Gets all the input_field elements of the page
const inputFields = document.querySelectorAll('.form__control');
const submitContactBtn = document.getElementById('submit-contact-btn');

const focusOnInput = (input) => {
  if (input) {
    input.target.value !== '' ?
      input.target.parentNode.classList.add('filled') :
      input.target.parentNode.classList.remove('filled')
  }
}

// Goes through the array inputFields
inputFields.forEach(input => {
  // Creates an event listener on the current input_field
  input.addEventListener('input', focusOnInput.bind(this));
})

// Clears the inputs on page load
const clearInputs = () => {
  inputFields.forEach(input => {
    input.value = '';
  })
}

clearInputs();

// SUBMIT BUTTON
submitContactBtn.addEventListener('click', () => {
  console.log('button clicked');
  alert('you sure you wanna do this???')
})