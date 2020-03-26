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
const inputFields = document.querySelectorAll('.input_field');
const submitContactBtn = document.getElementById('submit-contact-btn');

const focusOnInput = (input) => {
  input.target.value !== '' ?
    input.target.parentNode.classList.add('filled') :
    input.target.parentNode.classList.remove('filled')
}

// Goes through the array inputField
inputFields.forEach(input => {
  // Creates an event listener on the current input_field
  input.addEventListener('input', focusOnInput.bind(this));
});

// SUBMIT BUTTON
submitContactBtn.addEventListener('click', () => {
  console.log('button clicked');
  alert('you sure you wanna do this???')
})

// const toggleBtn = document.getElementById('toggle');
// let disabled;

// const toggleBtnHandler = () => {
//   console.log('toggle')
//   disabled = submitContactBtn.classList.contains('btn--disabled')

//   disabled
//     ?
//     submitContactBtn.classList.remove('btn--disabled') :
//     submitContactBtn.classList.add('btn--disabled');
// }

// toggleBtn.addEventListener('click', toggleBtnHandler)