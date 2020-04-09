// VARIABLES
const body = document.getElementsByTagName('body')[0];
const modalCalendar = document.getElementById('calendar-modal');
const calendarModalBtnHandler = document.getElementById('show-calendar-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBackdrop = document.getElementById('modal-backdrop');

const calendarModalHandler = () => {
  modalCalendar.classList.toggle('visible');
  modalBackdrop.classList.toggle('visible');
  body.classList.toggle('modal-open');
}

calendarModalBtnHandler.addEventListener('click', calendarModalHandler);
closeModalBtn.addEventListener('click', calendarModalHandler);
modalBackdrop.addEventListener('click', calendarModalHandler);