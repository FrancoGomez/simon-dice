// NOMENCLATURA VARIABLES
//-----------------------------------------------------------------------------
// En caso de que la variable contenga un elemento del html, comenzara con '$'.
//-----------------------------------------------------------------------------
// En caso de que la variable sea constante, y no contenga un elemento del html,
// sera escrita solo con mayusculas, y '_' representara espacios.
//-----------------------------------------------------------------------------
// En caso de que la variable no sea constante o contenga un elemento del html,
// se escribira con camelCase.
//-----------------------------------------------------------------------------

const $contenedorCuadradosJuego = document.querySelector(
  "#contenedor-cuadrados-juego"
);
const $numeroRonda = document.querySelector("#numero-ronda");
const $numeroPuntos = document.querySelector("#numero-puntos");
const $botonComenzar = document.querySelector("#boton-comenzar");
const $containerContenedorModal = document.querySelector(
  "#container-contenedor-modal"
);
const $tituloModal = document.querySelector('#titulo-modal')
const $descriptionModal = document.querySelector('#descripcion-modal')

const NUMERO_CUADRADOS = 9;
let arrayPatronNumerosSimonDice;
let numeroDeClick;
$numeroRonda.textContent = 1;
$numeroPuntos.textContent = 0;
let datosModalModificados = false;

function crearCuadradosJuego(cuadradosParaCrear) {
  for (let index = 0; index < cuadradosParaCrear; index++) {
    const CUADRADO = document.createElement("div");
    CUADRADO.setAttribute("id", index);
    CUADRADO.className =
      "cuadrados-juego--hover-activado cuadrados-juego--default";
    $contenedorCuadradosJuego.appendChild(CUADRADO);
  }
}

crearCuadradosJuego(NUMERO_CUADRADOS);

function agregarNumeroArrayPatronNumerosSimonDice() {
  const numeroRandom = Math.floor(Math.random() * NUMERO_CUADRADOS);
  arrayPatronNumerosSimonDice.push(numeroRandom);
}

function resaltarCuadrado($cuadrado) {
  $cuadrado.className =
    "cuadrados-juego--hover-desactivado cuadrados-juego--activo";

  setTimeout(function () {
    $cuadrado.className =
      "cuadrados-juego--hover-desactivado cuadrados-juego--default";
  }, 350);
}

function bloquearClickUsuario() {
  $contenedorCuadradosJuego.onclick = () => {};

  $contenedorCuadradosJuego.childNodes.forEach(function (childNode) {
    childNode.className =
      "cuadrados-juego--hover-desactivado cuadrados-juego--default";
  });
}

function desbloquearClickUsuario() {
  $contenedorCuadradosJuego.onclick = (evento) => {
    manejarClickUsuario(evento);
  };

  $contenedorCuadradosJuego.childNodes.forEach(function (childNode) {
    childNode.className =
      "cuadrados-juego--hover-activado cuadrados-juego--default";
  });
}

function reproducirPatronSimonDicenEnPantalla() {
  const RETRASO_TURNO_JUGADOR = 1000 * (arrayPatronNumerosSimonDice.length + 1);
  bloquearClickUsuario();

  arrayPatronNumerosSimonDice.forEach(function (posicionEnArray, index) {
    const SEGUNDOS_CUADRADO_ILUMINADO = 1000 * (index + 1);
    let $cuadrado = $contenedorCuadradosJuego.childNodes[posicionEnArray];

    setTimeout(function () {
      resaltarCuadrado($cuadrado);
    }, SEGUNDOS_CUADRADO_ILUMINADO);
  });

  setTimeout(function () {
    desbloquearClickUsuario();
  }, RETRASO_TURNO_JUGADOR);
}

function iniciarJuego() {
  $numeroRonda.textContent = 1;
  $numeroPuntos.textContent = 0;
  arrayPatronNumerosSimonDice = [];
  numeroDeClick = 0;
  agregarNumeroArrayPatronNumerosSimonDice();
  reproducirPatronSimonDicenEnPantalla();
}

function revisarSiClickeoCuadradoCorrecto(
  indexParaRevisarEnArray,
  idCuadradoClickeado
) {
  return (
    arrayPatronNumerosSimonDice[indexParaRevisarEnArray] ===
    Number(idCuadradoClickeado)
  );
}

function manejarUsuarioPerdio() {
  $containerContenedorModal.className = $containerContenedorModal.id;

  if(datosModalModificados){
    $descriptionModal.textContent = `Esta vez conseguiste ${$numeroPuntos.textContent} puntos. Pero no te preocupes, siempre podes volver a intentarlo y conseguir mas!`
  } else {
    $tituloModal.textContent = 'Uh... parece que perdiste'
    $descriptionModal.textContent = `Esta vez conseguiste ${$numeroPuntos.textContent} puntos. Pero no te preocupes, siempre podes volver a intentarlo y conseguir mas!`
    datosModalModificados = true
  }
}

function manejarClickUsuario(evento) {
  if (revisarSiClickeoCuadradoCorrecto(numeroDeClick, evento.target.id)) {
    evento.target.className =
      "cuadrados-juego--hover-activado cuadrados-juego--activo";
    numeroDeClick++;
    $numeroPuntos.textContent = Number($numeroPuntos.textContent) + 1;

    setTimeout(function () {
      evento.target.className =
        "cuadrados-juego--hover-activado cuadrados-juego--default";
    }, 350);

    if (arrayPatronNumerosSimonDice.length === numeroDeClick) {
      setTimeout(function () {
        $numeroRonda.textContent = Number($numeroRonda.textContent) + 1;
        numeroDeClick = 0;
        agregarNumeroArrayPatronNumerosSimonDice();
        reproducirPatronSimonDicenEnPantalla();
      }, 600);
    }
  } else {
    manejarUsuarioPerdio()
  }
}

$botonComenzar.onclick = function () {
  $containerContenedorModal.className = "oculto";
  iniciarJuego();
};