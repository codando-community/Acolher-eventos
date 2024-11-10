// Feed 10 items at a time
const itemsPerPage = 5; /* For testing */
let pageCurrent = 1;

// Function to control card visibility based on current page
function paginate() {
	const allRows = document.querySelectorAll(".cardRow");
	const totalItems = allRows.length;

	// Calculate the start/end index for current page
	const startIndex = (pageCurrent - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Check which rows to hide
	allRows.forEach((row, index) => {
		const rowHide = index < startIndex || index >= endIndex;

		if (rowHide) {
			row.style.display = "none";
		} else {
			row.removeAttribute("style"); // Clear inline styling
		}
	});

	// Update buttons based on current page
	const btnPrev = document.getElementById("btnPrev");
	if (pageCurrent === 1) {
		btnHide(btnPrev); // Hide if on first page
	} else {
		btnShow(btnPrev); // Show if not on first page
	}

	const btnNext = document.getElementById("btnNext");
	if (pageCurrent * itemsPerPage >= totalItems) {
		btnHide(btnNext); // Hide if on last page
	} else {
		btnShow(btnNext); // Show if more pages are available
	}
}

function btnHide(button) {
	if (button) {
		button.style.display = "none";
	}
}

function btnShow(button) {
	if (button) {
		button.removeAttribute("style");
	}
}

// Event listeners for pagination buttons
document.getElementById("btnPrev").addEventListener("click", () => {
	if (pageCurrent > 1) {
		pageCurrent--;
		paginate();
	}
});

document.getElementById("btnNext").addEventListener("click", () => {
	const allRows = document.querySelectorAll(".cardRow");
	if (pageCurrent * itemsPerPage < allRows.length) {
		pageCurrent++;
		paginate();
	}
});

paginate();
