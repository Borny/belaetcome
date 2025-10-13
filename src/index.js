import "./styles/main.scss";

import HeroHTML from "./components/hero.html";
import CompanyHTML from "./components/company.html";
import EnLiesseHTML from "./components/en-liesse.html";
import FuriosaHTML from "./components/furiosa.html";
import GalleryHTML from "./components/gallery.html";
import ResidenceHTML from "./components/residence.html";
import ContactHTML from "./components/contact.html";
import FooterHTML from "./components/footer.html";

import { Loader } from "./js/loader";
import { Company } from "./js/company";
import { EnLiesse } from "./js/en-liesse";
import { Furiosa } from "./js/furiosa";
import { Collapse } from "./js/repertoire";
import { MobileNav } from "./js/mobile-nav";
import { CalendarModal } from "./js/modal";
import { GalleryMobile } from "./js/gallery";
import { ContactForm } from "./js/contact-form";

const root = document.getElementById("root");

window.addEventListener("load", () => {
  root.innerHTML =
    HeroHTML +
    CompanyHTML +
    EnLiesseHTML +
    FuriosaHTML +
    GalleryHTML +
    ResidenceHTML +
    ContactHTML +
    FooterHTML;

  new Loader();
  new Company();
  new EnLiesse();
  new Furiosa();
  new Collapse();
  new MobileNav();
  new CalendarModal();
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
