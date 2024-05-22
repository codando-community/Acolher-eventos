function generateEvent(container, title, description, date, eventLink, recordingLink, tags, gerundio) {
	var cardDiv = document.createElement("div");
	cardDiv.classList.add("card");

	var hiddenDate = document.createElement("input");
	cardDiv.setAttribute('data-tags', tags.join(','));
	cardDiv.setAttribute('gerundio-tags', gerundio.join(','))
	hiddenDate.setAttribute("type", "hidden");
	hiddenDate.setAttribute("value", date);
	cardDiv.appendChild(hiddenDate);

	var dateDiv = document.createElement("div");
	dateDiv.classList.add("card-element-date");
	var dateHighlightDiv = document.createElement("div");
	dateHighlightDiv.classList.add("card-element-text-highlight");
	dateHighlightDiv.textContent = date.split("-")[2];
	var dateTextDiv = document.createElement("div");
	dateTextDiv.classList.add("card-element-text");
	dateTextDiv.textContent = date.split("-")[1];
	dateDiv.appendChild(dateHighlightDiv);
	dateDiv.appendChild(dateTextDiv);

	var blockWrapper = document.createElement("div");
	blockWrapper.classList.add("card-block-wrapper");

	var animRight = document.createElement("span");
	animRight.classList.add("animRight")
	var animDown = document.createElement("span");
	animDown.classList.add("animDown")
	var animLeft = document.createElement("span");
	animLeft.classList.add("animLeft")
	var animUp = document.createElement("span");
	animUp.classList.add("animUp")
	blockWrapper.appendChild(animRight);
	blockWrapper.appendChild(animDown);
	blockWrapper.appendChild(animLeft);
	blockWrapper.appendChild(animUp);

	var blockPrimary = document.createElement("div");
	blockPrimary.classList.add("card-block", "card-block-primary");
	var titleHeading = document.createElement("h3");
	titleHeading.classList.add("card-title");
	titleHeading.textContent = title;
	var subtitlePara = document.createElement("p");
	subtitlePara.classList.add("card-subtitle");
	subtitlePara.textContent = description;

	var tagBlock = document.createElement("div");
	var tagText = document.createElement("p");
	tagText.textContent = tags.join(", ");
	tagText.classList.add(gerundio)
	tagBlock.appendChild(tagText);

	blockPrimary.appendChild(titleHeading);
	blockPrimary.appendChild(subtitlePara);
	blockPrimary.appendChild(tagBlock);

	var blockSecondary = document.createElement("div");
	blockSecondary.classList.add("card-block", "card-block-secondary");

	var portrait = document.createElement("div");
	portrait.classList.add("portrait");

	function removeDiacritics(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	var lecturerName = description.split(/[ ,]/).slice(0, 2).join("_");
	lecturerName = removeDiacritics(lecturerName).toLowerCase();
	var portraitSrc = ("url(img/portrait/") + lecturerName + (".jpeg");
	portrait.style.backgroundImage = portraitSrc;

	var linkButton = document.createElement("a");
	var eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	var currentDate = new Date().setHours(-3, 0, 0, 0);
	if (eventDate >= currentDate) {
		linkButton.classList.add("card-button", "button-event");
		linkButton.href = eventLink;
		linkButton.textContent = "Acessar";
	} else {
		linkButton.classList.add("card-button", "button-recording");
		linkButton.href = recordingLink;
		linkButton.textContent = "Gravação";
	}

	blockSecondary.appendChild(portrait);
	blockSecondary.appendChild(linkButton);

	blockWrapper.appendChild(blockPrimary);
	blockWrapper.appendChild(blockSecondary);

	if (eventDate < currentDate) {
		cardDiv.classList.add("finished-event");
	} else if (eventDate === currentDate) {
		blockWrapper.classList.add("current-event");
	}

	cardDiv.appendChild(dateDiv);
	cardDiv.appendChild(blockWrapper);

	insertEventInOrder(container, cardDiv, eventDate);
}

function insertEventInOrder(container, newEvent) {
	var events = container.querySelectorAll(".card");

	if (events.length === 0) {
		container.appendChild(newEvent);
		return;
	}

	var newEventDate = new Date(newEvent.querySelector("input[type='hidden']").value);

	for (var i = events.length - 1; i >= 0; i--) {
		var currentEvent = events[i];
		var currentEventDate = new Date(currentEvent.querySelector("input[type='hidden']").value);

		if (newEventDate < currentEventDate) {
			container.insertBefore(newEvent, currentEvent.nextSibling);
			return;
		}
	}

	container.insertBefore(newEvent, container.firstChild);
}
function populateComboBox(container) {
    var events = container.querySelectorAll('.card');
    var tagsSet = new Set();
    var gerundioTagsSet = new Set();

    events.forEach(function(event) {
        var tags = event.getAttribute('data-tags');
        var gerundioTags = event.getAttribute('gerundio-tags');

        if (tags) {
            tags.split(',').forEach(function(tag) {
                tagsSet.add(tag.trim());
            });
        }

        if (gerundioTags) {
            gerundioTags.split(',').forEach(function(gerundioTag) {
                gerundioTagsSet.add(gerundioTag.trim());
            });
        }
    });

    var combinedComboBox = document.getElementById('combined-filter');

    var tagsOptgroup = document.createElement('optgroup');
    tagsOptgroup.label = 'Áreas';
    tagsSet.forEach(function(tag) {
        var option = document.createElement('option');
        option.text = tag;
        tagsOptgroup.appendChild(option);
    });

    var gerundioOptgroup = document.createElement('optgroup');
    gerundioOptgroup.label = 'Gerúndios';
    gerundioTagsSet.forEach(function(gerundioTag) {
        var option = document.createElement('option');
        option.text = gerundioTag;
        gerundioOptgroup.appendChild(option);
    });

    combinedComboBox.appendChild(gerundioOptgroup);
	combinedComboBox.appendChild(tagsOptgroup);
}
function filterEvents() {
    var selectedValue = document.getElementById('combined-filter').value;
    var events = document.querySelectorAll('.card');
    
    events.forEach(function(event) {
        var eventTags = event.getAttribute('data-tags').split(',');
        var eventGerundioTags = event.getAttribute('gerundio-tags').split(',');
        
        var displayEvent = (eventTags.includes(selectedValue) || eventGerundioTags.includes(selectedValue) || selectedValue === 'All');
        
        event.style.display = displayEvent ? 'flex' : 'none';
    });
}

document.getElementById('combined-filter').addEventListener('change', filterEvents);