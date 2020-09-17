import './styles/main.scss';
import '../favicons/favicons';

import { } from './js/loader';
import { Collapse } from './js/repertoire';
import { MobileNav } from './js/mobile-nav';
import { CalendarModal } from './js/modal';
import { GalleryMobile } from './js/gallery';

// Collapse
const collapse = new Collapse();
collapse.collapsing();

// Mobile Navigation
const mobileNav = new MobileNav();
mobileNav.clickActions();

// Modal 
const calendarModal = new CalendarModal();
calendarModal.initCalendarModalHandler();

// Gallery
const gallery = new GalleryMobile();
gallery.init();

/////////
// FORM
/////////

// INPUT LABEL ANIMATION
// Gets all the input_field elements of the page
// const inputFields = document.querySelectorAll('.form__control');
// const submitContactBtn = document.getElementById('submit-contact-btn');

// const focusOnInput = (input) => {
//   if (input) {
//     input.target.value !== '' ?
//       input.target.parentNode.classList.add('filled') :
//       input.target.parentNode.classList.remove('filled')
//   }
// }

// // Goes through the array inputFields
// inputFields.forEach(input => {
//   // Creates an event listener on the current input_field
//   input.addEventListener('input', focusOnInput.bind(this));
// })

// // Clears the inputs on page load
// const clearInputs = () => {
//   inputFields.forEach(input => {
//     input.value = '';
//   })
// }

// clearInputs();

// // SUBMIT BUTTON
// submitContactBtn.addEventListener('click', () => {
//   console.log('button clicked');
//   alert('you sure you wanna do this???')
// })
