// At large viewports, switch subheading from a list
const headerCarousel = document.getElementById("carousel");
const gerundios = ["Acolher", "Codando", "Comunicando", "Cuidando", "Desembolando", "Endireitando", "Engenheirando", "Ensinando", "Negociando", "Projetando", "Veterinando"];
let currentIndex = 0;
let intervalId = null;

const switchText = () => {
	currentIndex = (currentIndex + 1) % gerundios.length;
	headerCarousel.textContent = gerundios[currentIndex];
};

const viewportCheck = () => {
	if (window.innerWidth >= 800) {
		if (!intervalId) {
			intervalId = setInterval(switchText, 3000);
		}
	} else {
		clearInterval(intervalId);
		intervalId = null;
		headerCarousel.textContent = gerundios[0];
	}
};

window.addEventListener("load", viewportCheck);
window.addEventListener("resize", viewportCheck);
