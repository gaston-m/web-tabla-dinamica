document.addEventListener("DOMContentLoaded", inicializarContenido);

function inicializarContenido() {
  "use strict";

  let context = {
    cargado: false,
  };

  if (!context.gargado) {
    document.querySelector(".menu").addEventListener("click", desplegarMenu);

    document.querySelector("#home").addEventListener("click", () => {
      cargarContent("home.html");
    });
    document.querySelector("#astronomia").addEventListener("click", () => {
      cargarContent("astronomia.html");
    });
    document.querySelector("#ciencia").addEventListener("click", () => {
      cargarContent("ciencia.html");
    });
    document.querySelector("#avistamientos").addEventListener("click", () => {
      cargarContent("avistamientos.html");
    });
    document.querySelector("#administrador").addEventListener("click", () => {
      cargarContent("administrador.html");
    });

    /// Variables

    let url2 = "http://127.0.0.1/TPE3/html/";
    cargarContent("home.html");

    function desplegarMenu() {
      document.querySelector(".navegacion").classList.toggle("mostrarMenu");
    }

    async function cargarContent(pagina) {
      let content = document.querySelector("#content");
      console.log(content);
      let body = document.querySelector("body");

      let response = await fetch(url2 + pagina);

      if (response.ok) {
        let html = response.text();
        console.log(response);
        html.then((data) => {
          console.log(data);

          ///body.appendChild(script); ////  <script src="../js/administrador.js" async="async"></script>

          //data += script.outerHTML;
          content.innerHTML = data;

          window.history.pushState(pagina, pagina, pagina);

          context.cargado = true;
          if (pagina === "administrador.html") inicializarContenido();
        });
      } else {
        content.innerHTML =
          "<p>Error de conexion, No se pudo cargar el contenido</p>";
      }
    }
  }
}
