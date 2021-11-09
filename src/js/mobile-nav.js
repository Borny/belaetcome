export class MobileNav {
  constructor() {
    this.clickActions();
  }

  toggleNav() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('open');
  }

  clickActions() {
    const toggleNavBtn = document.getElementById('toggle-nav-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.menu__link');

    toggleNavBtn.addEventListener('click', this.toggleNav);
    mobileNavOverlay.addEventListener('click', this.toggleNav);
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', this.toggleNav);
    });
  }
}
