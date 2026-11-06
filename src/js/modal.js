export class CalendarModal {
  constructor() {
    this.initCalendarModalHandler();
  }

  toggleModal() {
    const body = document.getElementsByTagName("body")[0];
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalCalendar = document.getElementById("calendar-modal");
    modalBackdrop.classList.toggle("visible");
    modalCalendar.classList.toggle("visible");
    body.classList.toggle("modal-open");
  }

  initCalendarModalHandler() {
    const modalBtnHandler = document.getElementById("show-calendar-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalBackdrop = document.getElementById("modal-backdrop");

    // No "Calendrier" button on the page: the calendar is hidden.
    if (!modalBtnHandler) return;

    modalBtnHandler.addEventListener("click", this.toggleModal);
    closeModalBtn.addEventListener("click", this.toggleModal);
    modalBackdrop.addEventListener("click", this.toggleModal);
  }
}
