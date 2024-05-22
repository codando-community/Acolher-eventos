// Replace month numbers with their abbreviations
function replaceMonth() {
	var monthElements = document.body.querySelectorAll(".card-element-text");

	monthElements.forEach(function(monthElement) {
		var month = monthElement.textContent.trim().toLowerCase();
		switch (month) {
			case "01":
				monthElement.textContent = "Jan";
				break;
			case "02":
				monthElement.textContent = "Fev";
				break;
			case "03":
				monthElement.textContent = "Mar";
				break;
			case "04":
				monthElement.textContent = "Abr";
				break;
			case "05":
				monthElement.textContent = "Mai";
				break;
			case "06":
				monthElement.textContent = "Jun";
				break;
			case "07":
				monthElement.textContent = "Jul";
				break;
			case "08":
				monthElement.textContent = "Ago";
				break;
			case "09":
				monthElement.textContent = "Set";
				break;
			case "10":
				monthElement.textContent = "Out";
				break;
			case "11":
				monthElement.textContent = "Nov";
				break;
			case "12":
				monthElement.textContent = "Dez";
				break;
			default:
				console.error("Error: Invalid month abbreviation - ", month);
				break;
		}
	});
}

replaceMonth();
