
/* DOM CACHE */
const contentArea = document.getElementById("content-area");

const chronicleMenu = document.getElementById("chronicle-menu");

const doiHinh = document.getElementById("doiHinh");

const matchList = document.getElementById("match-list");

const noiChien = document.getElementById("noichien");

const winCount = document.getElementById("win-count");

const lossCount = document.getElementById("loss-count");

const drawCount = document.getElementById("draw-count");

const goalRanking = document.getElementById("goalRanking");

const goalRankingList = document.getElementById("goal-ranking-list");

const goalPeriod = document.getElementById("goal-period");

goalPeriod.textContent = "Period: Jul – Sep 2026";


/* BUTTON CACHE */

const chronicleBanner = document.getElementById("chronicle-banner");

const achievementBanner = document.getElementById("achievement-banner");

const expeditionBanner = document.getElementById("expedition-banner");

const civilwarBanner = document.getElementById("civilwar-banner");

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
        "thanhTich",
        "goalRanking",
        "match-list",
        "noichien"
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



/* VIỄN CHINH */

function toggleMatches() {

    toggleChronicleSection("match-list");

    requestAnimationFrame(() => {

        matchList.querySelectorAll(".detail")
            .forEach(detail => {

                detail.classList.remove("show");

            });

    });

}

/* NỘI CHIẾN */

function toggleNoiChien() {

    toggleChronicleSection("noichien");

    requestAnimationFrame(() => {

        noiChien.querySelectorAll(".detail")
            .forEach(detail => {

                detail.classList.remove("show");

            });

    });

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

/* MATCH DETAIL TOGGLE */
function toggleMatchDetail(match) {

    const details = match.querySelector(".detail");
    if (!details) return;

    const isOpen = details.classList.contains("show");

    document.querySelectorAll(".detail").forEach(d => {
        d.classList.remove("show");
    });

    if (!isOpen) {
        details.classList.add("show");
    }
}

/* CIVIL WAR ROSTER TOGGLE */
function toggleCivilWarRoster(box) {

    const card = box.closest(".match");
    if (!card) return;

    const roster = card.querySelector(".civilwar-roster");
    if (!roster) return;

    const isOpen = roster.classList.contains("show");

    document.querySelectorAll(".civilwar-roster").forEach(r => {
        r.classList.remove("show");
    });

    if (!isOpen) {
        roster.classList.add("show");
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


/* RENDER MATCH */

function renderMatch(match) {

    const result = getResult(match);

    const knightHtml = result
        ? `
            <img class="match-knight"
                 src="images/${result}knight.png"
                 alt="${result}">
          `
        : "";

    return `
        <div class="match">

            ${knightHtml}

            <div class="match-body">

                <h3>${match.date}</h3>

                <div class="score">

                    <span class="team">Samba</span>

                    <div class="score-box">
                        ${match.homeScore} : ${match.awayScore}
                    </div>

                    <span class="team">${match.opponent}</span>

                </div>

                <div class="detail">

                    <span class="knights-label">⚔ KNIGHTS</span>

                    <div class="knights-list">

                        ${match.knights.map(player => {

                            if ((match.mvp || []).includes(player)) {

                                return `<span class="knight-badge MVP">${player}</span>`;

                            }

                            return `<span class="knight-badge">${player}</span>`;

                        }).join("")}

                    </div>

                </div>

            </div>

        </div>
    `;

}


function renderAllMatches() {

    matchList.innerHTML =
        expeditionMatches
            .map(renderMatch)
            .join("");

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

function getRanking(matches) {

    const playerStats = {};

    matches.forEach(match => {

        // Goals
        (match.goals || []).forEach(player => {
            player = player.normalize("NFC").trim();

            if (!playerStats[player]) {
                playerStats[player] = {
                    goals: 0,
                    assists: 0,
                    mvp: 0
                };
            }

            playerStats[player].goals++;
        });

        // Assists
        (match.assists || []).forEach(player => {
            player = player.normalize("NFC").trim();

            if (!playerStats[player]) {
                playerStats[player] = {
                    goals: 0,
                    assists: 0,
                    mvp: 0
                };
            }

            playerStats[player].assists++;
        });

        // MVP
        (match.mvp || []).forEach(player => {
            player = player.normalize("NFC").trim();

            if (!playerStats[player]) {
                playerStats[player] = {
                    goals: 0,
                    assists: 0,
                    mvp: 0
                };
            }

            playerStats[player].mvp++;
        });

    });

    Object.values(playerStats).forEach(stats => {
        stats.points =
            stats.goals +
            stats.assists * 0.75 +
            stats.mvp * 0.25;
    });

    const ranking = Object.entries(playerStats);

    ranking.sort((a, b) => {

        // 1. Total Points
        if (b[1].points !== a[1].points) {
            return b[1].points - a[1].points;
        }

        // 2. Goals
        if (b[1].goals !== a[1].goals) {
            return b[1].goals - a[1].goals;
        }

        // 3. Assists
        if (b[1].assists !== a[1].assists) {
            return b[1].assists - a[1].assists;
        }

        // 4. MVP
        return b[1].mvp - a[1].mvp;

    });

    return ranking;

}

function getMatchesInPeriod(period) {

    return [...expeditionMatches, ...civilWarMatches].filter(match => {

        if (!match.date || match.date.includes("xx")) {
            return false;
        }

        const [, month, year] = match.date.split("/").map(Number);

        return (
            year === period.year &&
            period.months.includes(month)
        );

    });

}

function renderPeriod(period) {

    const matches = getMatchesInPeriod(period);
    const ranking = getRanking(matches);

    const rows = ranking.map(([player, stats], index) => {

        const rank = index + 1;

        const rankClass =
            index === 0 ? "gold" :
            index === 1 ? "silver" :
            index === 2 ? "bronze" : "";

        return `
            <div class="goal-row ${rankClass}">

                <div class="goal-summary">

                    <span class="goal-player">
                        ${rank}. ${player}
                    </span>

                    <span class="goal-points">
                        ${stats.goals}G • ${stats.assists}A • ${stats.mvp} MVP
                    </span>

                </div>

                <div class="goal-detail">
                    ❂ ${stats.points.toFixed(2)} PTS
                </div>

            </div>
        `;

    }).join("");

    return `
        <div class="goal-ranking-box">

            <div class="goal-ranking-header">

                <h4>PLAYER RANKING</h4>

                <p class="goal-period">
                    Period: ${period.title}
                </p>

            </div>

            <div class="goal-ranking-divider"></div>

            <div class="goal-ranking-list">
                ${rows}
            </div>

        </div>
    `;

}

function renderHallOfFame() {

    const hallOfFame = document.getElementById("hall-of-fame");

    hallOfFame.innerHTML = hallOfFamePeriods
        .map(period => renderPeriod(period))
        .join("");

}
      

function getCivilWarRecord(index) {

    let win = 0;
    let loss = 0;
    let draw = 0;

    for (let i = 0; i <= index; i++) {

        const result = getResult(civilWarMatches[i]);

        if (result === "win") {
            win++;
        }
        else if (result === "loss") {
            loss++;
        }
        else if (result === "draw") {
            draw++;
        }

    }
    return `${win}-${loss}-${draw}`;

}

function renderCivilWar(match, index) {

    const record = getCivilWarRecord(index);
    const result = getResult(match);
    return `
        <div class="match">

            <img class="match-knight"
                 src="images/${result}knight.png"
                 alt="${result}">

            <div class="match-body">

                <h3>${match.date}</h3>

                <div class="score">

                    <span class="team">${match.team}</span>

                    <div class="score-box">
                        ${match.homeScore} : ${match.awayScore}
                    </div>

                    <span class="team">${match.opponent}</span>

                </div>

                <div class="match-info">

                    <div class="info-box">
                        <span class="info-label">W-L-D</span>
                        <span class="info-value">${record}</span>
                    </div>

                    <div class="info-box knights-toggle" data-index="${index}">
                        <span class="info-label">⚔ KNIGHTS</span>
                        <span class="info-value">${match.knights}</span>
                    </div>

                    <div class="info-box">
                        <span class="info-label">MVP</span>
                        <span class="info-value">${(match.mvp || []).join(", ") || "N/A"}</span>
                    </div>

                </div>

                <div class="civilwar-roster">

                    <div class="roster-side">
                        <span class="roster-label">${match.team}</span>
                        <div class="roster-list">
                            ${(match.teamRoster || []).length
                                ? match.teamRoster.map(player => `<span class="knight-badge">${player}</span>`).join("")
                                : `<span class="roster-empty">Chưa cập nhật</span>`}
                        </div>
                    </div>

                    <div class="roster-side">
                        <span class="roster-label">${match.opponent}</span>
                        <div class="roster-list">
                            ${(match.opponentRoster || []).length
                                ? match.opponentRoster.map(player => `<span class="knight-badge">${player}</span>`).join("")
                                : `<span class="roster-empty">Chưa cập nhật</span>`}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    `;
}

function renderAllCivilWar() {

    noiChien.innerHTML =
        civilWarMatches
            .map((match, index) => renderCivilWar(match, index))
            .join("");

}

/* INIT */

function init() {

    renderAllMatches();
    updateRecord();
    renderAllCivilWar();
    renderHallOfFame();

}
init();

/* EVENT LISTENERS */

chronicleBanner.addEventListener("click", toggleChronicle);

achievementBanner.addEventListener("click", toggleThanhTich);

expeditionBanner.addEventListener("click", toggleMatches);

civilwarBanner.addEventListener("click", toggleNoiChien);

teamBanner.addEventListener("click", toggleDoiHinhTong);

/* PLAYER EVENT LISTENERS */

document.querySelectorAll(".player-toggle").forEach(button => {

    button.addEventListener("click", function () {

        togglePlayer(this.dataset.player);

    });

});

/* MATCH EVENT LISTENERS */

[matchList, noiChien].forEach(container => {

    container.addEventListener("click", function (event) {

        const knightsBox = event.target.closest(".knights-toggle");

        if (knightsBox) {
            toggleCivilWarRoster(knightsBox);
            return;
        }

        const match = event.target.closest(".match");

        if (!match) return;

        toggleMatchDetail(match);

    });

}); 

/* GOAL RANKING EVENT LISTENER */

goalRankingList.addEventListener("click", function (event) {

    const summary = event.target.closest(".goal-summary");

    if (!summary) return;

    const row = summary.closest(".goal-row");

    row.classList.toggle("open");

});