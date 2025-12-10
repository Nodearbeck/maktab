const content = document.getElementById("content-area");
const menuLinks = document.querySelectorAll(".list");
const toggleBtn = document.getElementById("toggleBtn");
const darkModeBtn = document.getElementById('darkModeBtn');
const sidebar = document.querySelector(".sidebar");  

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const page = link.dataset.page;
        if(!page) return;      
        if(template){
            contentArea.innerHTML = template.innerHTML;
            if(page==="pupils") setupSearch();
        } } )
    link.addEventListener("click", () => {
        const page = link.getAttribute("data-page");
        if (page === "home") loadHome();
        if (page === "teachers") loadTeachers();
        if (page === "pupils") loadPupils();
        if (page === "staff") loadStaff();
        if (page === "subjects") loadSubjects();
        if (page === "rooms") loadRooms();
        if(page=== "schedules") loadSchedule();
    });
});

let teachers = [
    { ism: "Ali", fam: "Karimov", fan: "Matematika" },
    { ism: "Dilshod", fam: "Rasulov", fan: "Fizika" }
];

let pupils = [
    { ism: "Ali", fam: "Karimov", sinf: "8-A" },
    { ism: "Dilshod", fam: "Rasulov", sinf: "9-B" },
    { ism: "Madina", fam: "Ismoilova", sinf: "7-A" }
];

let staff = [
    { ism: "Sardor Aliyev", lavozim: "Direktor" },
    { ism: "Lola Yuldasheva" , lavozim: "Bo‘lim boshlig‘i" },
    { ism: "Alisher Uzoqov", lavozim: "Qo‘riqchi" }
];

let subjects = [
    { nomi: "Matematika", soat: 5 },
    { nomi: "Fizika", soat: 4 },
    { nomi: "Kimyo", soat: 3 }
];

let rooms = [
    { nomi: "1-xona", turi: "Darsxona", sigimi: 25 },
    { nomi: "Kompyuter xonasi", turi: "Laboratoriya", sigimi: 20 },
    { nomi: "Server xonasi", turi: "Texnik xona", sigimi: 5 }
];
let schedule = {
    sinf: "8-A",
    days: {
        dushanba: ["Matematika", "Ona tili", "Fizika", "Tarix", "Ingliz tili"],
        seshanba: ["Fizika", "Matematika", "Kimyo", "Jismoniy tarbiya", "Geografiya"],
        chorshanba: ["Kimyo", "Biologiya", "Matematika", "Informatika", "Rus tili"],
        payshanba: ["Tarix", "Fizika", "Algebra", "Geometriya", "Robototexnika"],
        juma: ["Informatika", "Kimyo", "Biologiya", "Matematika", "Adabiyot"],
        shanba: ["Ingliz tili", "Matematika", "Jismoniy tarbiya", "Tarix", "Sinfdan tashqari ishlar"]
    }
};

function loadHome() {
    content.innerHTML = `
        <h2>BO'LIMLAR</h2>
        <div class="grid">
            <div class="card">O‘qituvchilar</div>
            <div class="card">O‘quvchilar</div>
            <div class="card">Xodimlar</div>
            <div class="card">Fanlar</div>
            <div class="card">Xonalar</div>
            <div class="card">Dars jadvallari</div>
        </div>
    `;
}

function filterInput() {
    const text = document.getElementById("filterBox").value.toLowerCase();
    return text;
}

function loadTeachers() {
    content.innerHTML = `
        <h2>O‘qituvchilar</h2>
        <input id="filterBox" placeholder="Ism yoki familiya bo‘yicha qidirish" class="filter">
        <button onclick="clearTeachers()" class="clear-btn">Barchasini o‘chirish</button>
        <table>
            <thead>
                <tr>
                    <th>Ismi</th><th>Fam</th><th>Fan</th><th></th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;
    renderTeachers();
    document.getElementById("filterBox").addEventListener("input", renderTeachers);
}

function clearTeachers() {
    teachers = [];
    renderTeachers();
}

    renderTeachers();
    document.getElementById("filterBox").addEventListener("input", renderTeachers);


function renderTeachers() {
    const val = filterInput();
    const body = document.getElementById("tableBody");
    let rows = teachers
        .filter(t => t.ism.toLowerCase().includes(val) || t.fam.toLowerCase().includes(val))
        .map((t, i) => `
        <tr>
            <td>${t.ism}</td>
            <td>${t.fam}</td>
            <td>${t.fan}</td>
            <td><button onclick="deleteTeacher(${i})">Delete</button></td>
        </tr>
    `).join("");
    body.innerHTML = rows;
}

function deleteTeacher(i) {
    teachers.splice(i, 1);
    renderTeachers();
}
function loadPupils() {
    content.innerHTML = `
        <h2>O‘quvchilar</h2>
        <input id="filterBox" placeholder="Ism yoki familiya bo‘yicha qidirish" class="filter">
        <button onclick="clearPupils()" class="clear-btn">Barchasini o‘chirish</button>
        <table>
            <thead>
                <tr>
                    <th>Ismi</th><th>Fam</th><th>Sinf</th><th></th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;
    renderPupils();
    document.getElementById("filterBox").addEventListener("input", renderPupils);
}

function clearPupils() {
    pupils = [];
    renderPupils();
}


function renderPupils() {
    const val = filterInput();
    const body = document.getElementById("tableBody");
    let rows = pupils
        .filter(p => p.ism.toLowerCase().includes(val) || p.fam.toLowerCase().includes(val))
        .map((p, i) => `
        <tr>
            <td>${p.ism}</td>
            <td>${p.fam}</td>
            <td>${p.sinf}</td>
            <td><button onclick="deletePupil(${i})">Delete</button></td>
        </tr>
    `).join("");
    body.innerHTML = rows;
}

function deletePupil(i) {
    pupils.splice(i, 1);
    renderPupils();
}

function loadStaff() {
    content.innerHTML = `
        <h2>Xodimlar</h2>
        <input id="filterBox" placeholder="Ism yoki familiya bo‘yicha qidiring" class="filter">
        <button onclick="clearStaff()" class="clear-btn">Barchasini o‘chirish</button>
        <table>
            <thead>
                <tr>
                    <th>Ismi</th><th>Lavozimi</th><th></th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;
    renderStaff();
    document.getElementById("filterBox").addEventListener("input", renderStaff);
}

function clearStaff() {
    staff = [];
    renderStaff();
}


function renderStaff() {
    const val = filterInput();
    const body = document.getElementById("tableBody");
    let rows = staff
        .filter(s => s.ism.toLowerCase().includes(val) || s.ism.toLowerCase().includes(val))
        .map((s, i) => `
        <tr>
            <td>${s.ism}</td>
            <td>${s.lavozim}</td>
            <td><button onclick="deleteStaff(${i})">Delete</button></td>
        </tr>
    `).join("");
    body.innerHTML = rows;
}

function deleteStaff(i) {
    staff.splice(i, 1);
    renderStaff();
}

function loadSubjects() {
    content.innerHTML = `
        <h2>Fanlar</h2>
        <input id="filterBox" placeholder="Fan nomi bo‘yicha qidiring" class="filter">
        <button onclick="clearSubjects()" class="clear-btn">Barchasini o‘chirish</button>
        <table>
            <thead>
                <tr>
                    <th>Fan</th><th>Soat</th><th></th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;
    renderSubjects();
    document.getElementById("filterBox").addEventListener("input", renderSubjects);
}

function clearSubjects() {
    subjects = [];
    renderSubjects();
}


function renderSubjects() {
    const val = filterInput();
    const body = document.getElementById("tableBody");
    let rows = subjects
        .filter(s => s.nomi.toLowerCase().includes(val))
        .map((s, i) => `
        <tr>
            <td>${s.nomi}</td>
            <td>${s.soat}</td>
            <td><button onclick="deleteSubject(${i})">Delete</button></td>
        </tr>
    `).join("");
    body.innerHTML = rows;
}

function deleteSubject(i) {
    subjects.splice(i, 1);
    renderSubjects();
}
function loadRooms() {
    content.innerHTML = `
        <h2>Xonalar</h2>
        <input id="filterBox" placeholder="Xona nomi yoki turi bo‘yicha qidiring" class="filter">
        <button onclick="clearRooms()" class="clear-btn">Barchasini o‘chirish</button>
        <table>
            <thead>
                <tr>
                    <th>Nomi</th><th>Turi</th><th>Sig‘imi</th><th></th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;
    renderRooms();
    document.getElementById("filterBox").addEventListener("input", renderRooms);
}

function clearRooms() {
    rooms = [];
    renderRooms();
}


function renderRooms() {
    const val = filterInput();
    const body = document.getElementById("tableBody");
    let rows = rooms
        .filter(r =>
            r.nomi.toLowerCase().includes(val) ||
            r.turi.toLowerCase().includes(val)
        )
        .map((r, i) => `
        <tr>
            <td>${r.nomi}</td>
            <td>${r.turi}</td>
            <td>${r.sigimi}</td>
            <td><button onclick="deleteRoom(${i})">Delete</button></td>
        </tr>
    `).join("");
    body.innerHTML = rows;
}


function deleteRoom(i) {
    rooms.splice(i, 1);
    renderRooms();
}

function loadSchedule() {
    content.innerHTML = `
        <h2>${schedule.sinf} sinf — 6 kunlik dars jadvali</h2>
        <div class="schedule-grid"></div>
    `;

    const box = document.querySelector(".schedule-grid");

    Object.keys(schedule.days).forEach(day => {
        let lessons = schedule.days[day]
            .map((d, i) => `<li>${i + 1}-dars: ${d}</li>`)
            .join("");

        box.innerHTML += `
            <div class="day-card">
                <h3>${day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                <ul>${lessons}</ul>
            </div>
        `;
    });
}