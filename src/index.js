import "./styles/main.scss";

import { Loader } from "./js/loader";
import { Company } from "./js/company";
import { EnLiesse } from "./js/en-liesse";
import { Furiosa } from "./js/furiosa";
import { Collapse } from "./js/repertoire";
import { MobileNav } from "./js/mobile-nav";
import { Modals } from "./js/modal";
import { GalleryMobile } from "./js/gallery";
import { ContactForm } from "./js/contact-form";

// The sections are already in the HTML (inserted at build time by src/index.ejs)
window.addEventListener("load", () => {
  // Footer copyright year (the HTML holds a static fallback)
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

  new Loader();
  new Company();
  new EnLiesse();
  new Furiosa();
  new Collapse();
  new MobileNav();
  new Modals();
  new GalleryMobile();
  new ContactForm();
});

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
//   alert('you sure you wanna do this???')
// })
