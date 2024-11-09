// At large viewports, switch subheading from a shuffled list and go through all before restarting
const headerCarousel = document.getElementById("carousel");
const list = ["Acolher", "Codando", "Comunicando", "Cuidando", "Desembolando", "Endireitando", "Engenheirando", "Ensinando", "Negociando", "Projetando", "Veterinando"];
let intervalId = null;
let currentIndex = 0;
let shuffledList;

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		// Swap elements
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Shuffle items except the starter
shuffledList = shuffleArray([...list.slice(1)]);

const switchText = () => {
	if (currentIndex === 0 && headerCarousel.textContent === "Acolher") {
		currentIndex++;
	}
	// Set to the current shuffled item
	headerCarousel.textContent = shuffledList[currentIndex];
	// Increment index and wrap around
	currentIndex = (currentIndex + 1) % shuffledList.length;
};

// Don't switch immediately on page load and sync with animation duration
const startSwitchingText = () => {
	setTimeout(() => {
		intervalId = setInterval(switchText, 3000);
	}, 3000);
};

const viewportCheck = () => {
	if (window.innerWidth >= 800) {
		if (!intervalId) {
			startSwitchingText();
		}
	} else {
		clearInterval(intervalId);
		intervalId = null;
		// Reset to the first item for mobile view
		headerCarousel.textContent = list[0];
		currentIndex = 0;
	}
};

// Initialize the carousel with the first item
headerCarousel.textContent = list[0];

window.addEventListener("load", viewportCheck);
window.addEventListener("resize", viewportCheck);
