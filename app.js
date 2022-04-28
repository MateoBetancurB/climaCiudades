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
		mostrarError("Ambos campos son obligatorias");
		return;
	}
	// console.log(ciudad);
	// console.log(pais);
}

//mostrar errores
function mostrarError(mensaje) {
	console.log(mensaje);
}
