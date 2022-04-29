const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
	formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
	e.preventDefault();

	//validar campos del formulario
	const ciudad = document.querySelector("#ciudad").value;
	const pais = document.querySelector("#pais").value;

	//hubo un error
	if (ciudad === "" || pais === "") {
		mostrarError("Ambos campos son obligatorios");
		return;
	}

	//consultar la API
	consultarAPI(ciudad, pais);
}

//mostrar errores
function mostrarError(mensaje) {
	//mostrar solo 1 aviso de alerta
	const alerta = document.querySelector(".bg-red-100");

	if (!alerta) {
		//crear una alerta con el mensaje de error
		const alerta = document.createElement("div");
		alerta.classList.add(
			"bg-red-100",
			"border-red-400",
			"text-red-700",
			"px-4",
			"py-3",
			"rounded",
			"max-w-md",
			"mx-auto",
			"mt-6",
			"text-center"
		);
		alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
  `;

		container.appendChild(alerta);

		//elimina el mensaje de error despues de 3 segundos
		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}
}

//extraer datos del API
function consultarAPI(ciudad, pais) {
	const appId = "26f17521532f9513c76bb1bb6f5967c1";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

	Spinner(); //muestra el spinner de carga de la información

	fetch(url)
		.then((respuesta) => {
			return respuesta.json();
		})
		.then((datos) => {
			limpiarHTML(); //limpiar HTML previo
			if (datos.cod === "404") {
				mostrarError("Ciudad no encontrada");
				return;
			}

			//imprimir respuesta en HTML
			mostrarClima(datos);
		});
}

function mostrarClima(datos) {
	const {
		name,
		main: { temp, temp_max, temp_min },
	} = datos;

	const temperaturaActual = kelvinACentigrados(temp);
	const temperaturaMaxima = kelvinACentigrados(temp_max);
	const temperaturaMinima = kelvinACentigrados(temp_min);

	//imprime el nombre de la ciudad
	const nombreCiudad = document.createElement("h1");
	nombreCiudad.textContent = `${name}`;
	nombreCiudad.classList.add("font-bold", "text-4xl");

	//imprime temperatura actual
	const actual = document.createElement("p");
	actual.innerHTML = `Temperatura Actual: ${temperaturaActual} &#8451`;
	actual.classList.add("font-bold", "text-3xl");

	//imprime temperatura maxima
	const maxima = document.createElement("p");
	maxima.innerHTML = `Temperatura Máxima: ${temperaturaMaxima} &#8451`;
	maxima.classList.add("font-bold", "text-xl");

	//imprime temperatura minima
	const minima = document.createElement("p");
	minima.innerHTML = `Temperatura Mínima: ${temperaturaMinima} &#8451`;
	minima.classList.add("font-bold", "text-xl");

	const resultadoDiv = document.createElement("div");
	resultadoDiv.classList.add("text-center", "text-white");
	resultadoDiv.appendChild(nombreCiudad);
	resultadoDiv.appendChild(actual);
	resultadoDiv.appendChild(maxima);
	resultadoDiv.appendChild(minima);

	resultado.appendChild(resultadoDiv);
}

//mostrar la medición en HTML como grados centígrados
function kelvinACentigrados(grados) {
	return parseInt(grados - 273.15);
}

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

function Spinner() {
	limpiarHTML(); //limpiar HTML antes de mostrar el spinner

	const divSpinner = document.createElement("div");
	divSpinner.classList.add("sk-fading-circle");

	divSpinner.innerHTML = `

  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  
  `;

	resultado.appendChild(divSpinner);
}
