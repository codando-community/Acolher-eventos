// Switch secondary header text with a rotating list
var headerCarousel = document.getElementById("carousel");

async function switchText() {
	await new Promise(r => setTimeout(r, 342));

	if (headerCarousel.textContent === "Acolher") {
		headerCarousel.textContent = "Codando";
	} else if (headerCarousel.textContent === "Codando") {
		headerCarousel.textContent = "Comunicando";
	} else if (headerCarousel.textContent === "Comunicando") {
		headerCarousel.textContent = "Cuidando";
	} else if (headerCarousel.textContent === "Cuidando") {
		headerCarousel.textContent = "Desembolando";
	} else if (headerCarousel.textContent === "Desembolando") {
		headerCarousel.textContent = "Endireitando";
	} else if (headerCarousel.textContent === "Endireitando") {
		headerCarousel.textContent = "Engenheirando";
	} else if (headerCarousel.textContent === "Engenheirando") {
		headerCarousel.textContent = "Ensinando";
	} else if (headerCarousel.textContent === "Ensinando") {
		headerCarousel.textContent = "Negociando";
	} else if (headerCarousel.textContent === "Negociando") {
		headerCarousel.textContent = "Projetando";
	} else if (headerCarousel.textContent === "Projetando") {
		headerCarousel.textContent = "Veterinando";
	} else if (headerCarousel.textContent === "Veterinando") {
		headerCarousel.textContent = "Acolher";
	}
};

setInterval(switchText, 3000);
