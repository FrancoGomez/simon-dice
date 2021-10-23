
//NOMENCLATURA VARIABLES
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

const NUMERO_CUADRADOS = 9

function crearCuadradosJuego(cuadradosParaCrear) {
  for (let index = 0; index < cuadradosParaCrear; index++) {
    const CUADRADO = document.createElement("div");
    CUADRADO.setAttribute("id", index);
    CUADRADO.className = "cuadrados-juego cuadrados-juego--default";
    $contenedorCuadradosJuego.appendChild(CUADRADO);
  }
}

crearCuadradosJuego(NUMERO_CUADRADOS);

$contenedorCuadradosJuego.onclick = function (evento) {
  if (evento.target.className === "cuadrados-juego cuadrados-juego--default") {
    evento.target.className = "cuadrados-juego cuadrados-juego--activo";
  } else {
    evento.target.className = "cuadrados-juego cuadrados-juego--default";
  }
};
