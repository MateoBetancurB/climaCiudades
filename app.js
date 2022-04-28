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
	// console.log(ciudad);
	// console.log(pais);
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
