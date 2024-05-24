function generateEvent(container, date, title, description, eventLink, recordingLink, tags, gerundio) {
    // Create card section and set attributes
    const cardSection = createElementWithClasses('div', 'card-section');
    cardSection.setAttribute('data-tags', tags.join(','));
    cardSection.setAttribute('gerundio-tags', gerundio);

    // Hidden date input
    const hiddenDate = document.createElement("input");
    hiddenDate.type = "hidden";
    hiddenDate.value = date;
    cardSection.appendChild(hiddenDate);

    // Card date
    const cardDate = createCardDate(date);
    cardSection.appendChild(cardDate);

    // Main card content
    const cardMain = createElementWithClasses('div', 'card-main');
    appendAnimations(cardMain);

    // Card info block
    const cardInfo = createElementWithClasses('div', 'card-block', 'card-info');
    cardInfo.appendChild(createCardTitle(title));
    cardInfo.appendChild(createCardSummary(description));
    cardInfo.appendChild(createTagDiv(tags, gerundio));
    cardMain.appendChild(cardInfo);

    // Card aside block
    const cardAside = createElementWithClasses('div', 'card-block', 'card-aside');
    cardAside.appendChild(createPortrait(description));
    cardAside.appendChild(createLinkButton(date, eventLink, recordingLink));
    cardMain.appendChild(cardAside);

    // Add event class based on the date
    styleEventByDate(cardSection, cardMain, date);

    // Append the main content to card section
    cardSection.appendChild(cardMain);

    // Insert the event in the container
    insertEventInOrder(container, cardSection, new Date(date).setUTCHours(0, 0, 0, 0));
}

function createElementWithClasses(tag, ...classes) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
}

function createCardDate(date) {
    const cardDate = createElementWithClasses('div', 'card-date');

    const dateDay = createElementWithClasses('div', 'card-day');
    dateDay.textContent = date.split("-")[2];
    cardDate.appendChild(dateDay);

    const dateTextDiv = createElementWithClasses('div', 'card-month');
    dateTextDiv.textContent = date.split("-")[1];
    cardDate.appendChild(dateTextDiv);

    return cardDate;
}

function appendAnimations(container) {
    const animations = ['animRight', 'animDown', 'animLeft', 'animUp'];
    animations.forEach(anim => {
        const span = createElementWithClasses('span', anim);
        container.appendChild(span);
    });
}

function createCardTitle(title) {
    const cardTitle = createElementWithClasses('h3', 'card-title');
    cardTitle.textContent = title;
    return cardTitle;
}

function createCardSummary(description) {
    const cardSummary = createElementWithClasses('div', 'card-block', 'card-summary');

    const summaryText = createElementWithClasses('p', 'card-subtitle');
    summaryText.textContent = description;
    cardSummary.appendChild(summaryText);

    const collapseSummary = createElementWithClasses('button', 'collapse-summary');
    collapseSummary.textContent = "Ler mais";
    cardSummary.appendChild(collapseSummary);

    return cardSummary;
}

function createTagDiv(tags, gerundio) {
    const tagDiv = createElementWithClasses('div', 'card-tags');
    tags.forEach(tag => {
        const tagText = createElementWithClasses('span', 'tag', gerundio.toLowerCase());
        tagText.textContent = tag;
        tagDiv.appendChild(tagText);
    });
    return tagDiv;
}

function createPortrait(description) {
    const portrait = createElementWithClasses('div', 'portrait');

    const lecturerName = removeDiacritics(description.split(/[ ,]/).slice(0, 2).join("_")).toLowerCase();
    portrait.style.backgroundImage = `url(img/portrait/${lecturerName}.jpeg)`;

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

function styleEventByDate(cardSection, cardMain, date) {
    const eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
    const currentDate = new Date().setUTCHours(-3, 0, 0, 0);

    if (eventDate < currentDate) {
        cardSection.classList.add("finished-event");
    } else if (eventDate === currentDate) {
        cardMain.classList.add("current-event");
    }
}

function insertEventInOrder(container, newEvent, newEventDate) {
    const events = container.querySelectorAll(".card-section");

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
    var events = container.querySelectorAll('.card-section');
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