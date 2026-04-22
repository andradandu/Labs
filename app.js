const app = document.getElementById("app");

// --- Helper: retrigger animations ---
function retriggerAnimation(element, animationClass) {
    element.classList.remove(animationClass);
    void element.offsetWidth; // force reflow
    element.classList.add(animationClass);
}

// --- Section creator ---
function createSection(id, title, animationClass) {
    const section = document.createElement("section");
    section.id = id;

    // Heading
    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.classList.add("floating"); // floating animation
    section.appendChild(heading);

    // Add section to page
    app.appendChild(section);

    // Trigger animation on load
    requestAnimationFrame(() => section.classList.add(animationClass));

    return section;
}

// =========================
// 🟢 HOME SECTION (API)
// =========================
async function buildHome() {
    const res = await fetch("http://127.0.0.1:5000/api/personal");
    const data = await res.json();

    const section = createSection("home", "About Me", "fade-in");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
        <p><strong>Education:</strong> ${data.education}</p>
        <p><strong>Places Lived:</strong> ${data.placesLived}</p>
    `;

    section.appendChild(card);
}

// =========================
// 🔵 PROFESSIONAL SECTION (API)
// =========================
async function buildProfessional() {
    const res = await fetch("http://127.0.0.1:5000/api/professional");
    const jobs = await res.json();

    const section = createSection("professional", "Professional Experience", "slide-in");

    jobs.forEach(job => {
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

// =========================
// 🟡 HOBBIES SECTION (API)
// =========================
async function buildHobbies() {
    const res = await fetch("http://127.0.0.1:5000/api/hobbies");
    const hobbies = await res.json();

    const section = createSection("hobbies", "Hobbies & Passions", "fade-in");

    hobbies.forEach(h => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = h.interest;

        section.appendChild(card);
    });
}

// =========================
// 🚀 INIT (load everything)
// =========================
async function init() {
    await buildHome();
    await buildProfessional();
    await buildHobbies();
}

init();

// =========================
// 🧭 NAVIGATION (click menu)
// =========================
function navigateTo(sectionId, animationClass) {
    const section = document.getElementById(sectionId);

    // Scroll to section
    section.scrollIntoView({ behavior: "smooth" });

    // Retrigger animation on section
    retriggerAnimation(section, animationClass);

    // Retrigger animation on cards inside section
    const cards = section.querySelectorAll(".card");
    cards.forEach(card => retriggerAnimation(card, animationClass));
}