export default window.onload = function () {
  document.getElementById("loader").style.opacity = 0
  document.getElementById('loader-path').style.opacity = 0;
  setTimeout(() => {
    document.getElementById("loader").style.display = "none"
  }, 1000)
}