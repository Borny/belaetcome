export class Loader {
  constructor() {
    this.loader = document.getElementById('loader');
    this.hero = document.getElementById('hero');

    this.onLoad();
  }

  onLoad() {
    this.loader.classList.add('hidden');
    this.hero.classList.remove('hidden');
  }
}
