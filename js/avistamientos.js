document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  document
    .querySelector("#btn-registrar")
    .addEventListener("click", verificarCaptcha);
  let refrescar = document.querySelector("#refrescar");
  if (refrescar)
    

  let captcha;

  insertarCaptcha();

  function insertarCaptcha() {
    let tagCaptcha = document.querySelector("#captcha");
    captcha = getCaptcha();
    tagCaptcha.innerHTML = captcha;
  }

  function getCaptcha() {
    let captcha = "";

    let characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; // LENGTH == 62

    for (let i = 0; i < 7; i++) {
      if (i === 3) {
        captcha += " ";
      } else {
        let pos = Math.floor(Math.random() * 62);
        captcha += characters[pos];
      }
    }

    return captcha;
  }

  function verificarCaptcha() {
    //let captcha = document.querySelector("#captcha").innerHTML;
    let captchaIngresado = document.querySelector("#confirmacionCaptcha").value;

    if (captcha === captchaIngresado) {
      let cap = document.querySelector("#cap-acep");
      cap.classList.toggle("mostrar-cap");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        let cap = document.querySelector("#cap-acep");
        cap.classList.toggle("mostrar-cap");
      }, 3000);
    } else {
      let cap = document.querySelector("#cap-rec");
      cap.classList.toggle("mostrar-cap");

      setTimeout(() => {
        let cap = document.querySelector("#cap-rec");
        cap.classList.toggle("mostrar-cap");
      }, 1500);
    }
  }
});
