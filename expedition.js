/* VIỄN CHINH — trang riêng, độc lập, dùng data từ matches.js */

const matchList = document.getElementById("match-list");

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

function renderMatch(match, index) {

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

                <div class="match-info match-info-duo">

                    <div class="info-box knights-toggle" data-index="${index}">
                        <span class="info-label">⚔ KNIGHTS</span>
                        <span class="info-value">${match.knights.length}</span>
                    </div>

                    <div class="info-box">
                        <span class="info-label">MVP</span>
                        <span class="info-value">${(match.mvp || []).join(", ") || "N/A"}</span>
                    </div>

                </div>

                <div class="detail">

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
            .map((match, index) => renderMatch(match, index))
            .join("");

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

renderAllMatches();

matchList.addEventListener("click", function (event) {

    const knightsBox = event.target.closest(".knights-toggle");

    if (!knightsBox) return;

    const match = knightsBox.closest(".match");
    if (!match) return;

    toggleMatchDetail(match);

});