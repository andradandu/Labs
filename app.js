const app = document.getElementById("app");

function createSection(id, title, animationClass) {
    const section = document.createElement("section");
    section.id = id;
    section.classList.add(animationClass);

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.classList.add("floating");

    section.appendChild(heading);

    return section;
}

// HOME
function buildHome() {
    const section = createSection("home", "About Me", "fade-in");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${profileData.personal.name}</h3>
        <p><strong>Date of Birth:</strong> ${profileData.personal.dateOfBirth}</p>
        <p><strong>Education:</strong> ${profileData.personal.education}</p>
        <p><strong>Places Lived:</strong> ${profileData.personal.placesLived.join(", ")}</p>
    `;

    section.appendChild(card);
    app.appendChild(section);
}

// PROFESSIONAL
function buildProfessional() {
    const section = createSection("professional", "Professional Experience", "slide-in");

    profileData.professional.jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>${job.period}</p>
        `;

        section.appendChild(card);
    });

    app.appendChild(section);
}

// HOBBIES
function buildHobbies() {
    const section = createSection("hobbies", "Hobbies & Passions", "fade-in");

    profileData.hobbies.interests.forEach(hobby => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = hobby;
        section.appendChild(card);
    });

    app.appendChild(section);
}

// INIT
function init() {
    buildHome();
    buildProfessional();
    buildHobbies();
}

init();