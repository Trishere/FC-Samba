/* NỘI CHIẾN — trang riêng, độc lập, dùng data từ matches.js */

const noiChien = document.getElementById("noichien");

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

renderAllCivilWar();

noiChien.addEventListener("click", function (event) {

    const knightsBox = event.target.closest(".knights-toggle");

    if (knightsBox) {
        toggleCivilWarRoster(knightsBox);
    }

});
