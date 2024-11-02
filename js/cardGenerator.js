function generateEvent(container, date, title, summary, eventLink, recordingLink, tags, gerundio) {

	// Create card row and set attributes
	const cardRow = createElementWithClasses("div", "card-row");
	cardRow.setAttribute("data-tags", tags.join(","));
	cardRow.setAttribute("gerundio-tags", gerundio);

	// Hidden date input
	const hiddenDate = document.createElement("input");
	hiddenDate.type = "hidden";
	hiddenDate.value = date;
	cardRow.appendChild(hiddenDate);

	// Card date
	const cardDate = createCardDate(date);
	cardRow.appendChild(cardDate);

	// Card main content
	const cardMain = createElementWithClasses("div", "card-main");
	appendAnimations(cardMain);

	// Card info section
	const cardInfo = createElementWithClasses("div", "card-info");
	cardInfo.appendChild(createCardTitle(title));
	cardInfo.appendChild(createCardSummary(summary));
	cardInfo.appendChild(createTagDiv(tags, gerundio));
	cardMain.appendChild(cardInfo);

	// Card aside section
	const cardAside = createElementWithClasses("div", "card-aside");
	cardAside.appendChild(createPortrait(summary));
	cardAside.appendChild(createLinkButton(date, eventLink, recordingLink));
	cardMain.appendChild(cardAside);

	// Add event class by date
	styleEventByDate(cardRow, cardMain, date);

	// Append main content to row
	cardRow.appendChild(cardMain);

	// Insert event in container
	insertEventInOrder(container, cardRow, new Date(date).setUTCHours(0, 0, 0, 0));
}

function createElementWithClasses(tag, ...classes) {
	const element = document.createElement(tag);
	element.classList.add(...classes);

	return element;
}

function createCardDate(date) {
	const cardDate = createElementWithClasses("div", "card-date");

	const dateDay = createElementWithClasses("div", "card-day");
	dateDay.textContent = date.split("-")[2];
	cardDate.appendChild(dateDay);

	const dateTextDiv = createElementWithClasses("div", "card-month");
	dateTextDiv.textContent = date.split("-")[1];
	cardDate.appendChild(dateTextDiv);

	return cardDate;
}

function appendAnimations(container) {
	const animations = ["animRight", "animBottom", "animLeft", "animTop"];
	animations.forEach(anim => {
		const span = createElementWithClasses("span", anim);
		container.appendChild(span);
	});
}

function createCardTitle(title) {
	const cardTitle = createElementWithClasses("h3", "card-title");
	cardTitle.textContent = title;

	return cardTitle;
}

function createCardSummary(summary) {
	const cardSummary = createElementWithClasses("div", "card-summary");

	const summaryText = createElementWithClasses("p", "summary-text");
	summaryText.textContent = summary;
	cardSummary.appendChild(summaryText);

	const summaryExpand = createElementWithClasses("button", "card-button", "summary-expand");
	summaryExpand.textContent = "Ler mais";
	cardSummary.appendChild(summaryExpand);

	summaryExpand.onclick = function() {
		summaryText.style.webkitLineClamp = "none";
		summaryExpand.style.display = "none";
	}

	return cardSummary;
}

function createTagDiv(tags, gerundio) {
	const tagDiv = createElementWithClasses("div", "card-tags");
	tags.forEach(tag => {
		const tagText = createElementWithClasses("span", "tag", gerundio.toLowerCase());
		tagText.textContent = tag;
		tagDiv.appendChild(tagText);
	});

	return tagDiv;
}

// Set portrait image path by matching filename with guest name and surname extracted from the card summary
// E.g. "John Doe, renowned professor at..." => Path must be "img/portrait/john_doe"
// File extension must be .jpeg
function createPortrait(summary) {
	const portrait = createElementWithClasses("div", "portrait");

	const guestName = removeDiacritics(summary.split(/[ ,]/).slice(0, 2).join("_")).toLowerCase();
	portrait.style.backgroundImage = `url(img/portrait/${guestName}.jpeg)`;

	return portrait;
}

function createLinkButton(date, eventLink, recordingLink) {
	const linkButton = document.createElement("a");
	const eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	const currentDate = new Date().setUTCHours(-3, 0, 0, 0);

	if (eventDate >= currentDate) {
		linkButton.classList.add("card-button", "button-event");
		linkButton.href = eventLink;
		linkButton.textContent = "Acessar";
	} else {
		linkButton.classList.add("card-button", "button-recording");
		linkButton.href = recordingLink;
		linkButton.textContent = "Gravação";
	}

	return linkButton;
}

function removeDiacritics(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function styleEventByDate(cardRow, cardMain, date) {
	const eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	const currentDate = new Date().setUTCHours(-3, 0, 0, 0);

	if (eventDate < currentDate) {
		cardRow.classList.add("finished-event");
	} else if (eventDate === currentDate) {
		cardMain.classList.add("current-event");
	}
}

function insertEventInOrder(container, newEvent, newEventDate) {
	const events = container.querySelectorAll(".card-row");

	if (events.length === 0) {
		container.appendChild(newEvent);

		return;
	}

	for (let i = events.length - 1; i >= 0; i--) {
		const currentEvent = events[i];
		const currentEventDate = new Date(currentEvent.querySelector("input[type='hidden']").value).setUTCHours(0, 0, 0, 0);

		if (newEventDate < currentEventDate) {
			container.insertBefore(newEvent, currentEvent.nextSibling);

			return;
		}
	}

	container.insertBefore(newEvent, container.firstChild);
}

function populateComboBox(container) {
	var events = container.querySelectorAll(".card-row");
	var tagsSet = new Set();
	var gerundioTagsSet = new Set();

	events.forEach(function(event) {
		var tags = event.getAttribute("data-tags");
		var gerundioTags = event.getAttribute("gerundio-tags");

		if (tags) {
			tags.split(",").forEach(function(tag) {
				tagsSet.add(tag.trim());
			});
		}

		if (gerundioTags) {
			gerundioTags.split(",").forEach(function(gerundioTag) {
				gerundioTagsSet.add(gerundioTag.trim());
			});
		}
	});

	var combinedComboBox = document.getElementById("combined-filter");

	var tagsOptGroup = document.createElement("optgroup");
	tagsOptGroup.label = "Áreas";
	tagsSet.forEach(function(tag) {
		var option = document.createElement("option");
		option.text = tag;
		tagsOptGroup.appendChild(option);
	});

	var gerundioOptGroup = document.createElement("optgroup");
	gerundioOptGroup.label = "Gerúndios";
	gerundioTagsSet.forEach(function(gerundioTag) {
		var option = document.createElement("option");
		option.text = gerundioTag;
		gerundioOptGroup.appendChild(option);
	});

	combinedComboBox.appendChild(gerundioOptGroup);
	combinedComboBox.appendChild(tagsOptGroup);
}

function filterEvents() {
	var selectedValue = document.getElementById("combined-filter").value;
	var events = document.querySelectorAll(".card");

	events.forEach(function(event) {
		var eventTags = event.getAttribute("data-tags").split(",");
		var eventGerundioTags = event.getAttribute("gerundio-tags").split(",");

		var displayEvent = (eventTags.includes(selectedValue) || eventGerundioTags.includes(selectedValue) || selectedValue === "All");

		event.style.display = displayEvent ? "flex" : "none";
	});
}

document.getElementById("combined-filter").addEventListener("change", filterEvents);
