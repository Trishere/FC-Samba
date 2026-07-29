/* DOM CACHE */
const contentArea = document.getElementById("content-area");

const chronicleMenu = document.getElementById("chronicle-menu");

const doiHinh = document.getElementById("doiHinh");

const winCount = document.getElementById("win-count");

const lossCount = document.getElementById("loss-count");

const drawCount = document.getElementById("draw-count");

/* BUTTON CACHE */

const chronicleBanner = document.getElementById("chronicle-banner");

const achievementBanner = document.getElementById("achievement-banner");

const teamBanner = document.getElementById("team-banner");

/* SECTION HELPERS */

function hideSections(ids) {

    ids.forEach(id => {

        const box = document.getElementById(id);

        if (!box) return;

        box.classList.add("section-hidden");
        box.classList.remove("fade-in");

    });

}

function closePlayerDetails() {

    document.querySelectorAll(".player-detail").forEach(player => {

        player.classList.remove("show");

    });

}

function closeMainSections() {
    closePlayerDetails();

    hideSections([
        "doiHinh"
    ]);

}

function closeChronicleSections() {

    hideSections([
        "thanhTich"
    ]);

}

function closeChronicle() {

    closeChronicleSections();

    chronicleMenu.classList.add("section-hidden");

}

function openSection(id) {

    const box = document.getElementById(id);

    if (!box) return;

    box.classList.remove("section-hidden");
    box.classList.add("fade-in");

}

function scrollToContent() {

    contentArea.scrollIntoView({
        behavior: "smooth"
    });

}

/* BIÊN NIÊN SỬ */

function toggleChronicle() {

    if (chronicleMenu.classList.contains("section-hidden")) {

        closeMainSections();

        chronicleMenu.classList.remove("section-hidden");

    } else {

        closeChronicle();

    }

}

/* ĐỘI HÌNH */

function toggleDoiHinhTong() {

    const isOpen =
        !doiHinh.classList.contains("section-hidden");

    closeChronicle();
    closeMainSections();

    if (isOpen) return;

    openSection("doiHinh");

    scrollToContent();

}

/* CHRONICLE SUB MENU */

function toggleChronicleSection(id) {

    const box = document.getElementById(id);

    const isOpen =
        !box.classList.contains("section-hidden");

    if (id === "thanhTich") {

        document.querySelectorAll(".goal-row.open").forEach(row => {
            row.classList.remove("open");
        });

    }

    closeChronicleSections();

    if (isOpen) return;

    openSection(id);

    scrollToContent();

}

/* THÀNH TÍCH */

function toggleThanhTich() {

    toggleChronicleSection("thanhTich");

}

/* PLAYER TOGGLE */
function togglePlayer(id) {

    const target = document.getElementById(id);

    if (!target) return;

    const isOpen = target.classList.contains("show");

    document.querySelectorAll(".player-detail").forEach(el => {

        el.classList.remove("show");

    });

    document.querySelectorAll(".player-toggle").forEach(btn => {

        btn.setAttribute("aria-expanded", "false");

    });

    if (!isOpen) {

        target.classList.add("show");

        const trigger = document.querySelector(`.player-toggle[data-player="${id}"]`);

        if (trigger) trigger.setAttribute("aria-expanded", "true");

    }

}

/* RENDER RESULT  */

function getResult(match) {

    if (
        typeof match.homeScore !== "number" ||
        typeof match.awayScore !== "number"
    ) {
        return null;
    }

    if (match.homeScore > match.awayScore) return "win";

    if (match.homeScore < match.awayScore) return "loss";

    return "draw";

}

function updateRecord() {

    let win = 0;
    let loss = 0;
    let draw = 0;

    expeditionMatches.forEach(match => {

        const result = getResult(match);

        if (result === "win") {
            win++;
        }
        else if (result === "loss") {
            loss++;
        }
        else if (result === "draw") {
            draw++;
        }

    });

    winCount.textContent = win;
    lossCount.textContent = loss;
    drawCount.textContent = draw;

}

/* INIT */

function init() {

    updateRecord();

}
init();

/* EVENT LISTENERS */

chronicleBanner.addEventListener("click", toggleChronicle);

achievementBanner.addEventListener("click", toggleThanhTich);

teamBanner.addEventListener("click", toggleDoiHinhTong);

/* PLAYER EVENT LISTENERS */

document.querySelectorAll(".player-toggle").forEach(button => {

    button.addEventListener("click", function () {

        togglePlayer(this.dataset.player);

    });

});