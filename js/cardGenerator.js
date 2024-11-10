function generateEvent(container, date, title, summary, eventLink, recordingLink, tags, gerundio) {

	// Create card row and set attributes
	const cardRow = createElementWithClasses("div", "cardRow");
	cardRow.setAttribute("data-tags", tags.join(","));
	cardRow.setAttribute("gerundio-tags", gerundio);

	// Hidden date input
	const hiddenDate = document.createElement("input");
	hiddenDate.type = "hidden";
	hiddenDate.value = date;
	cardRow.appendChild(hiddenDate);

	// Card date and card main content
	const cardDate = createCardDate(date);
	const cardMain = createElementWithClasses("div", "cardMain");
	appendAnimations(cardMain);

	// Card info section
	const cardInfo = createElementWithClasses("div", "cardInfo");
	cardInfo.appendChild(createCardTitle(title));
	cardInfo.appendChild(createCardSummary(summary));
	cardInfo.appendChild(createTagDiv(tags, gerundio));
	cardMain.appendChild(cardInfo);

	// Card aside section
	const cardAside = createElementWithClasses("div", "cardAside");
	cardAside.appendChild(createPortrait(summary));
	cardAside.appendChild(createLinkButton(date, eventLink, recordingLink));
	cardMain.appendChild(cardAside);

	// Add event class by date
	styleEventByDate(cardRow, cardMain, date);

	// Append content to row and insert event in container
	cardRow.appendChild(cardDate);
	cardRow.appendChild(cardMain);
	insertEventInOrder(container, cardRow, new Date(date));
}

function createElementWithClasses(tag, ...classes) {
	const element = document.createElement(tag);
	element.classList.add(...classes);

	return element;
}

function createCardDate(date) {
	const cardDate = createElementWithClasses("div", "cardDate");

	// Extract day and month
	const [year, month, day] = date.split("-");

	const dayElement = createElementWithClasses("div", "cardDay");
	dayElement.textContent = day;
	cardDate.appendChild(dayElement);

	const monthElement = createElementWithClasses("div", "cardMonth");
	monthElement.textContent = month;
	cardDate.appendChild(monthElement);

	return cardDate;
}

function appendAnimations(container) {
	const fragment = document.createDocumentFragment();
	["animRight", "animBottom", "animLeft", "animTop"].forEach(anim => {
		// Minimize reflows by appending all spans to a temporary container first
		fragment.appendChild(createElementWithClasses("span", anim));
	});
	container.appendChild(fragment);
}

function createCardTitle(title) {
	const cardTitle = createElementWithClasses("h2", "cardTitle");
	cardTitle.textContent = title;

	return cardTitle;
}

function createCardSummary(summary) {
	const cardSummary = createElementWithClasses("div", "cardSummary");
	const summaryText = createElementWithClasses("p", "summaryText");
	summaryText.textContent = summary;

	const summaryExpand = createElementWithClasses("button", "cardButton", "summaryExpand");
	summaryExpand.textContent = "Ler mais";
	summaryExpand.onclick = () => {
		summaryText.style.webkitLineClamp = "none";
		summaryExpand.style.visibility = "hidden";
	};
	cardSummary.appendChild(summaryText);
	cardSummary.appendChild(summaryExpand);

	return cardSummary;
}

function createTagDiv(tags, gerundio) {
	const tagDiv = createElementWithClasses("div", "cardTags");
	tags.forEach(tag => {
		const tagText = createElementWithClasses("span", "tag", gerundio.toLowerCase());
		tagText.textContent = tag;
		tagDiv.appendChild(tagText);
	});

	return tagDiv;
}

// Set portrait image path by matching filename with guest name and surname extracted from the card summary beginning
// E.g. "John Doe, renowned professor at..." => Path must be "img/portrait/john_doe"
// File extension must be .jpeg
function createPortrait(summary) {
	// Remove accents from guest name
	function removeDiacritics(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	const portrait = createElementWithClasses("div", "portrait");
	const guestName = removeDiacritics(summary.split(/[\s,]+/).slice(0, 2).join("_")).toLowerCase();
	portrait.style.backgroundImage = `url(img/portrait/${guestName}.jpeg)`;

	return portrait;
}

function normalizeDate(date) {
	let normalizedDate = new Date(date);

	// Check if string without time component
	if (typeof date === "string" && !date.includes("T")) {
		// Append time part to ensure local time parsing
		normalizedDate = new Date(date + "T00:00:00");
	}
	normalizedDate.setHours(0, 0, 0, 0);

	return normalizedDate;
}

function createLinkButton(date, eventLink, recordingLink) {
	const eventDate = normalizeDate(date);
	const currentDate = normalizeDate(new Date());

	const linkButton = document.createElement("a");
	const isEventUpcoming = eventDate >= currentDate;

	linkButton.classList.add("cardButton", isEventUpcoming ? "buttonEvent" : "buttonRecording");
	linkButton.href = isEventUpcoming ? eventLink : recordingLink;
	linkButton.textContent = isEventUpcoming ? "Acessar" : "Gravação";

	return linkButton;
}

function styleEventByDate(cardRow, cardMain, date) {
	const eventDate = normalizeDate(date);
	const currentDate = normalizeDate(new Date());

	if (eventDate < currentDate) {
		cardRow.classList.add("finishedEvent");
	} else if (eventDate.getTime() === currentDate.getTime()) {
		cardMain.classList.add("currentEvent");
	}
}

function insertEventInOrder(container, newEvent, newEventDate) {
	const events = container.querySelectorAll(".cardRow");

	if (events.length === 0) {
		container.appendChild(newEvent);

		return;
	}

	for (let i = events.length - 1; i >= 0; i--) {
		const currentEvent = events[i];
		const currentEventDate = new Date(currentEvent.querySelector("input[type='hidden']").value);

		if (newEventDate < currentEventDate) {
			container.insertBefore(newEvent, currentEvent.nextSibling);

			return;
		}
	}
	container.insertBefore(newEvent, container.firstChild);
}

function populateComboBox(container) {
	const events = container.querySelectorAll(".cardRow");
	const tagsSet = new Set();
	const gerundioTagsSet = new Set();

	events.forEach(event => {
		const tags = event.getAttribute("data-tags");
		const gerundioTags = event.getAttribute("gerundio-tags");

		if (tags) tags.split(",").forEach(tag => tagsSet.add(tag.trim()));
		if (gerundioTags) gerundioTags.split(",").forEach(tag => gerundioTagsSet.add(tag.trim()));
	});

	// Populate combo box
	const combinedComboBox = document.getElementById("combinedFilter");
	const tagsOptGroup = createOptGroup("Áreas", tagsSet);
	const gerundioOptGroup = createOptGroup("Gerúndios", gerundioTagsSet);

	combinedComboBox.appendChild(tagsOptGroup);
	combinedComboBox.appendChild(gerundioOptGroup);
}

function createOptGroup(label, tagsSet) {
	const optGroup = document.createElement("optgroup");
	optGroup.label = label;
	tagsSet.forEach(tag => {
		const option = document.createElement("option");
		option.text = tag;
		optGroup.appendChild(option);
	});

	return optGroup;
}

function filterEvents() {
	const selectedValue = document.getElementById("combinedFilter").value;
	const events = document.querySelectorAll(".card");

	// Display events based on selected filter
	events.forEach(event => {
		const eventTags = event.getAttribute("data-tags").split(",");
		const eventGerundioTags = event.getAttribute("gerundio-tags").split(",");

		const displayEvent = (eventTags.includes(selectedValue) || eventGerundioTags.includes(selectedValue) || selectedValue === "All");
		event.style.display = displayEvent ? "flex" : "none";
	});
}

document.getElementById("combinedFilter").addEventListener("change", filterEvents);
