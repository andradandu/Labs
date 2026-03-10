const app = document.getElementById("app");

// --- Helper: retrigger animations ---
function retriggerAnimation(element, animationClass) {
    element.classList.remove(animationClass);  // Remove the animation class
    void element.offsetWidth;                  // Force browser reflow
    element.classList.add(animationClass);    // Add class back to restart animation
}

// --- Section creator ---
function createSection(id, title, animationClass) {
    const section = document.createElement("section");
    section.id = id;

    // Heading
    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.classList.add("floating");  // Floating animation stays infinite
    section.appendChild(heading);

    // Append section first
    app.appendChild(section);

    // Trigger initial animation
    requestAnimationFrame(() => section.classList.add(animationClass));

    return section;
}

// --- Build sections ---

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
}

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
}

function buildHobbies() {
    const section = createSection("hobbies", "Hobbies & Passions", "fade-in");

    profileData.hobbies.interests.forEach(hobby => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = hobby;
        section.appendChild(card);
    });
}

// --- Initialize page ---
function init() {
    buildHome();
    buildProfessional();
    buildHobbies();
}

init();

// --- Navigation from navbar ---
function navigateTo(sectionId, animationClass) {
    const section = document.getElementById(sectionId);

    // Smooth scroll
    section.scrollIntoView({ behavior: "smooth" });

    // Retrigger animation on section
    retriggerAnimation(section, animationClass);

    // Retrigger animation on all child cards
    const cards = section.querySelectorAll(".card");
    cards.forEach(card => retriggerAnimation(card, animationClass));
}