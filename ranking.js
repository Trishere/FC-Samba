/* RANKING PAGE — độc lập, tự tính lại từ matches.js + halloffame.js */

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

function getRanking(matches) {

    const playerStats = {};

    function addStat(list, key) {

        (list || []).forEach(entry => {

            const match = entry.match(/^(.*?)\s*[x×\*]\s*(\d+)$/i);

            let player = entry;
            let count = 1;

            if (match) {
                player = match[1];
                count = Number(match[2]);
            }

            player = player.normalize("NFC").trim();

            if (!playerStats[player]) {
                playerStats[player] = {
                    goals: 0,
                    assists: 0,
                    mvp: 0
                };
            }

            playerStats[player][key] += count;

        });

    }

    matches.forEach(match => {
        addStat(match.goals, "goals");
        addStat(match.assists, "assists");
        addStat(match.mvp, "mvp");
    });

    Object.values(playerStats).forEach(stats => {
        stats.points =
            stats.goals +
            stats.assists * 0.75 +
            stats.mvp * 0.25;
    });

    const ranking = Object.entries(playerStats);

    ranking.sort((a, b) => {

        if (b[1].points !== a[1].points) {
            return b[1].points - a[1].points;
        }

        if (b[1].goals !== a[1].goals) {
            return b[1].goals - a[1].goals;
        }

        if (b[1].assists !== a[1].assists) {
            return b[1].assists - a[1].assists;
        }

        return b[1].mvp - a[1].mvp;

    });

    return ranking;

}

function renderRow([player, stats], index) {

    const rank = index + 1;

    const rankClass =
        rank === 1 ? "gold" :
        rank === 2 ? "silver" :
        rank === 3 ? "bronze" : "";

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

}

function initRankingPage() {

    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("index"));
    const period = hallOfFamePeriods[index];

    const periodLabel = document.getElementById("ranking-period");
    const list = document.getElementById("ranking-list");

    if (!period) {
        periodLabel.textContent = "Không tìm thấy dữ liệu";
        return;
    }

    periodLabel.textContent = period.title;

    const ranking = getRanking(getMatchesInPeriod(period));

    list.innerHTML = ranking.map(renderRow).join("");

    list.addEventListener("click", function (event) {

        const row = event.target.closest(".goal-row");
        if (!row) return;

        row.classList.toggle("open");

    });

}

initRankingPage();