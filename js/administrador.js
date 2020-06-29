//document.addEventListener("DOMContentLoaded", async () => {
//"use strict";

alert("Me cargue");

let url =
  "https://web-unicen.herokuapp.com/api/groups/138gastonmunoz/avistamientos/";

document.querySelector("#btn-registrar").addEventListener("click", () => {
  registrarObj(1);
});

document.querySelector("#btn-x3").addEventListener("click", () => {
  registrarObj(3);
});

document
  .querySelector("#btn-limpiar")
  .addEventListener("click", limpiarBusqueda);

document
  .querySelector("#btn-busqueda")
  .addEventListener("click", mostrarObjetos);

//// Estado Global

let state = {
  editando: false,
  editId: "",
  messages: [],
  errors: [],
};

let objetosAvistados = [];

// Cargando el contenido inicial del servicio (api)

cargarCont();

//setInterval(cargarCont, 4000);

/// FUNCTIONS

function limpiarBusqueda() {
  let busqueda = document.querySelector("#busqueda");
  busqueda.value = "";
  mostrarObjetos();
}

function ocultarBotones(btns) {
  btns.map((btn) => {
    document.querySelector("#" + btn).classList.toggle("ocultar");
  });
}

function mostrarBotones(btns) {
  btns.map((btn) => {
    document.querySelector("#" + btn).classList.toggle("mostrar");
  });
}

async function enviarEdit() {
  let pNombre = document.querySelector("#nombre");
  let nombre = pNombre.value;
  let pTipo = document.querySelector("#tipo");
  let tipo = pTipo.value;
  let pDistancia = document.querySelector("#distancia");
  let distancia = pDistancia.value;
  let pFecha = document.querySelector("#fecha");
  let fecha = pFecha.value;
  let pAvistador = document.querySelector("#avistador");
  let avistador = pAvistador.value;

  if (!nombre) {
    state.errors.push({ error: "Debe ingresar todos los Datos" });
  }
  if (!tipo) {
    state.errors.push({ error: "Debe ingresar todos los Datos" });
  }

  if (!distancia) {
    state.errors.push({ error: "Debe ingresar todos los Datos" });
  }

  if (!fecha) {
    state.errors.push({ error: "Debe ingresar todos los Datos" });
  }

  if (!avistador) {
    state.errors.push({ error: "Debe ingresar todos los Datos" });
  }

  if (state.errors.length > 0) {
    informarErrores();
  } else {
    let registro = {
      thing: {
        nombre,
        tipo,
        distancia,
        fecha,
        avistador,
      },
    };

    let opciones = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registro),
    };

    let response = await fetch(url + state.editId, opciones);

    if (response.ok) {
      ocultarBotones(["btn-registrar", "btn-x3"]);

      mostrarBotones(["btn-cargar-editar"]);

      state.messages.push({ message: "Objeto editado Exitosamente" });

      informarSuccess();

      document
        .querySelector("#btn-cargar-editar")
        .removeEventListener("click", enviarEdit);

      //  Reseteamos el state

      state.editId = "";
      state.editando = false;

      /// RESETEAMOS lOS INPUTS

      pTipo = document.querySelector("#tipo").value = "galaxia";
      pNombre = document.querySelector("#nombre").value = "";
      pDistancia = document.querySelector("#distancia").value = "";
      pFecha = document.querySelector("#fecha").value = "";
      pAvistador = document.querySelector("#avistador").value = "";

      //  Volvemos a cargar la tabla
      cargarCont();
    } else {
      console.log(response);
      state.errors.push({
        error: "ERROR, El Registro NO fue actualizado",
      });
      informarErrores();
    }
  }
}

async function editarRow(id) {
  if (!state.editando) {
    /// Actualizamos el state
    state.editando = true;

    /// vamos a probar el state tipo context para evitar que se edite otro registro cuando ya se esta editando
    let pNombre = document.querySelector("#nombre"); //
    let pTipo = document.querySelector("#tipo");
    let pDistancia = document.querySelector("#distancia");
    let pFecha = document.querySelector("#fecha");
    let pAvistador = document.querySelector("#avistador");

    try {
      let response = await fetch(url + id);

      if (response.ok) {
        console.log(response);
        let data = await response.json();

        let objeto = data.information.thing;

        pNombre.value = objeto.nombre;
        pTipo.value = objeto.tipo;
        pDistancia.value = objeto.distancia;
        pAvistador.value = objeto.avistador;
        pFecha.value = objeto.fecha;

        ocultarBotones(["btn-registrar", "btn-x3"]);

        mostrarBotones(["btn-cargar-editar"]);

        // Actualizamos el estado global

        state.editId = id;

        document
          .querySelector("#btn-cargar-editar")
          .addEventListener("click", enviarEdit);
      }
    } catch (err) {
      console.log(err);
      state.errors.push({ error: "Error no se puede cargar el contenido" });
      informarErrores();
    }
  } else {
    state.errors.push({
      error: "Termine la edicion en curso",
    });
    informarErrores();
  }

  /*
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          errors.push({
            error: "ERROR de conexion, nose puede mostrar el contenido",
          });
        }
      })
      .then((obj) => {
        console.log(obj);

      });
      */
}

function eliminarRow(id) {
  if (!state.editando) {
    fetch(url + id, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          state.messages.push({ message: "Registro eliminado exitosamente" });
          informarSuccess();
          cargarCont();
        } else {
          state.errors.push({
            error: "ERROR de Conexion NO se pudo eliminar el registro",
          });
          informarErrores();
        }
      })
      .catch((err) => {
        console.log("ERROE DELETE", err);
        state.errors.push({
          error: "ERROR en el servidor, NO se pudo eliminar el registro",
        });
        informarErrores();
      });

    // console.log("Aqui me ando...");
  } else {
    state.errors.push({
      error: "Termine la edicion en curso",
    });
    informarErrores();
  }
}

function registrarObj(nro) {
  let pNombre = document.querySelector("#nombre");
  let nombre = pNombre.value;
  let pTipo = document.querySelector("#tipo");
  let tipo = pTipo.value;
  let pDistancia = document.querySelector("#distancia");
  let distancia = pDistancia.value;
  let pFecha = document.querySelector("#fecha");
  let fecha = pFecha.value;
  let pAvistador = document.querySelector("#avistador");
  let avistador = pAvistador.value;

  if (!nombre) {
    state.errors.push({ error: "Debe cargar todos los datos" });
  }
  if (!tipo) {
    state.errors.push({ error: "Debe cargar todos los datos" });
  }

  if (!distancia) {
    state.errors.push({ error: "Debe cargar todos los datos" });
  }

  if (!fecha) {
    state.errors.push({ error: "Debe cargar todos los datos" });
  }

  if (!avistador) {
    state.errors.push({ error: "Debe cargar todos los datos" });
  }

  if (state.errors.length > 0) {
    informarErrores();
  } else {
    let registro = {
      thing: {
        nombre,
        tipo,
        distancia,
        fecha,
        avistador,
      },
    };

    //console.log(registro);

    let opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(registro),
    };

    for (let i = 0; i < nro; i++) {
      //      objetosAvistados.push(registro);
      fetch(url, opciones)
        .then((response) => {
          console.log(response);

          if (response.ok) {
            return response.json();
          } else {
            state.errors.push({
              error: "ERROR en la conexion, NO se pudo realizar el registro",
            });
            informarErrores();
          }
        })
        .then((obj) => {
          cargarCont();
          pNombre.value = "";
          pTipo.value = "galaxia";
          pDistancia.value = "";
          pFecha.value = "";
          pAvistador.value = "";
          state.messages.push({
            message: "Objeto registrado exitosamente",
          });
          informarSuccess();
        })
        .catch((err) => {
          console.log("ERROR EN POST", err);
          state.errors.push({
            error: "ERROR de Servidor, nose pudo realisar el registro",
          });
          informarErrores();
        });
    }
  }
}

function cargarCont() {
  /// Aca nos traemos todo lo que haya en la api rest
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        state.errors.push({
          error: "Error en la Conexion, no se puede cargar el contenido",
        });
        informarErrores();
      }
    })
    .then((obj) => {
      objetosAvistados = obj.avistamientos;
      console.log(objetosAvistados);
      mostrarObjetos();
    })
    .catch((err) => {
      console.log("ERROR DEL SERVIDOR", err);
      state.errors.push({
        error: "Error del Servidor, No se puede mostrar el contenido",
      });
      informarErrores();
    });
}

function mostrarObjetos() {
  //// Se encarga de Carggar los objetos traidos desde la API
  let busqueda = document.querySelector("#busqueda").value;

  let tabla = document.querySelector("#content-tabla"); //    let tabla = document.querySelector("#objetos-avistados");

  tabla.innerHTML = "";

  console.log(objetosAvistados.length);

  for (let i = 0; i < objetosAvistados.length; i++) {
    if (
      objetosAvistados[i].thing.nombre
        .toUpperCase()
        .includes(busqueda.toUpperCase())
    ) {
      let row = crearrRegistro(objetosAvistados[i]);
      //// agregado
      tabla.appendChild(row);
    }
  }
}

function crearrRegistro(registro) {
  let row = document.createElement("tr");
  row.id = registro._id;

  if (
    registro.thing.tipo === "planeta" &&
    parseFloat(registro.thing.distancia) <= 100
  ) {
    row.classList.add("planeta-cercano");
  }

  let colNombre = document.createElement("td");
  colNombre.innerText = registro.thing.nombre;
  colNombre.classList.add("nombre-fila");

  let colTipo = document.createElement("td");
  colTipo.innerText = registro.thing.tipo;

  let colDistancia = document.createElement("td");
  colDistancia.innerText = registro.thing.distancia;

  let colFecha = document.createElement("td");
  colFecha.innerText = registro.thing.fecha;

  let colAvistador = document.createElement("td");
  colAvistador.innerText = registro.thing.avistador;

  ///  BOTON para borrar -- le añadimos un evento y le pasamos el id como parametro
  let btnBorrar = document.createElement("button");
  //btnBorrar.innerText = "Borrar";
  btnBorrar.classList.add("btnIco");
  btnBorrar.addEventListener("click", () => {
    eliminarRow(registro._id);
  });

  let icoBorrar = document.createElement("i");
  icoBorrar.classList.add("fas");
  icoBorrar.classList.add("fa-trash-alt");

  btnBorrar.appendChild(icoBorrar);

  // BOTON EDITAR -- le añadimos un evento y le pasamos el id como parametro

  let btnEditar = document.createElement("button");
  //btnEditar.innerText = "Edit";
  btnEditar.classList.add("btnIco");
  btnEditar.addEventListener("click", () => {
    editarRow(registro._id);
  });

  let icoEdit = document.createElement("i");
  icoEdit.classList.add("fas");
  icoEdit.classList.add("fa-pen-square");

  btnEditar.appendChild(icoEdit);

  let colBtn = document.createElement("td");
  colBtn.classList.add("col-del-edit");

  colBtn.appendChild(btnEditar);
  colBtn.appendChild(btnBorrar);

  /// fin boton editar

  row.appendChild(colNombre);
  row.appendChild(colTipo);
  row.appendChild(colDistancia);
  row.appendChild(colFecha);
  row.appendChild(colAvistador);
  row.appendChild(colBtn);

  return row;
}

function informarErrores() {
  let elem = document.querySelector(".form-incorrecto");
  elem.classList.toggle("mostrar-cap");
  elem.innerHTML = state.errors[0].error;

  state.errors = [];
  setTimeout(() => {
    document.querySelector(".form-incorrecto").classList.toggle("mostrar-cap");
  }, 1500);
}

function informarSuccess() {
  console.log(state);

  let elem = document.querySelector(".form-correcto");
  elem.innerHTML = state.messages[0].message;
  elem.classList.toggle("mostrar-cap");
  console.log(state.messages);
  elem.innerHTML = state.messages[0].message;

  state.messages = [];

  setTimeout(() => {
    document.querySelector(".form-correcto").classList.toggle("mostrar-cap");
  }, 1500);
}
//});
