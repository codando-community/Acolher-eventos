// Replace month numbers with their abbreviations
function replaceMonth() {
	const monthElements = document.body.querySelectorAll(".card-month");
	const monthAbbreviations = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

	monthElements.forEach(monthElement => {
		const month = monthElement.textContent.trim();
		// Convert to zero-based index
		const monthIndex = parseInt(month, 10) - 1;

		// Invalid entry fallback
		monthElement.textContent = monthAbbreviations[monthIndex]?? "ERRO";
	});
}

replaceMonth();
