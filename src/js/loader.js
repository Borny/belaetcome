export class Loader {
  constructor() {
    this.onLoad();
  }

  onLoad() {
    console.log('onLLLoad');
    window.addEventListener('load', () => {
      document.getElementById('loader').style.opacity = 0;
      document.getElementById('loader-path').style.opacity = 0;
      console.log('onload');

      setTimeout(() => {
        console.log('set time out');
        document.getElementById('loader').style.display = 'none';
      }, 1000);
    });
  }
}
