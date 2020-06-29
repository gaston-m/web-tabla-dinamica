document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  document.querySelector("#avanzar").addEventListener("click", () => {
    adelantarImg(1);
  });

  document.querySelector("#retroceder").addEventListener("click", () => {
    adelantarImg(-1);
  });

  document.querySelector("#img-1").addEventListener("click", () => {
    actualImg(0);
  });

  document.querySelector("#img-2").addEventListener("click", () => {
    actualImg(1);
  });

  document.querySelector("#img-3").addEventListener("click", () => {
    actualImg(2);
  });

  ////-  carrousel-//
  let imgIndex = 0;
  mostrarImg(imgIndex);

  function adelantarImg(n) {
    mostrarImg((imgIndex += n));
  }

  function actualImg(n) {
    imgIndex = n;
    mostrarImg(imgIndex);
  }

  function mostrarImg() {
    let i;
    let imgs = document.getElementsByClassName("imagen");
    let dots = document.getElementsByClassName("dot");
    if (imgIndex >= imgs.length) {
      imgIndex = 0;
    }
    if (imgIndex < 0) {
      imgIndex = imgs.length - 1;
    }
    for (i = 0; i < imgs.length; i++) {
      imgs[i].className = imgs[i].className.replace("mostrar-img", "");
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
      dots[i].className = dots[i].className.replace("active", "");
    }

    console.log(imgIndex);
    imgs[imgIndex].classList.toggle("mostrar-img");
    dots[imgIndex].classList.toggle("active");
  }

  setInterval(() => {
    adelantarImg(1);
  }, 3200);
});
