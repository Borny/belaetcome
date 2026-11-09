// Popups sharing the #modal-backdrop. Each one opens from its button and
// closes with its close button, a click on the backdrop or the Escape key.
export class Modals {
  constructor() {
    this.backdrop = document.getElementById("modal-backdrop");
    this.openedModal = null;

    this.register("show-calendar-btn", "calendar-modal");
    this.register("show-residence-form-btn", "residence-form-modal");

    this.backdrop.addEventListener("click", () => this.close());
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.close();
    });
  }

  register(openBtnId, modalId) {
    const openBtn = document.getElementById(openBtnId);
    const modal = document.getElementById(modalId);

    // No button on the page (e.g. the "Calendrier" button is hidden).
    if (!openBtn || !modal) return;

    openBtn.addEventListener("click", () => this.open(modal));
    modal
      .querySelector(".btn__modal--close")
      .addEventListener("click", () => this.close());
  }

  open(modal) {
    this.close();
    this.openedModal = modal;
    modal.classList.add("visible");
    this.backdrop.classList.add("visible");
    document.body.classList.add("modal-open");
  }

  close() {
    if (!this.openedModal) return;
    this.openedModal.classList.remove("visible");
    this.backdrop.classList.remove("visible");
    document.body.classList.remove("modal-open");
    this.openedModal = null;
  }
}
