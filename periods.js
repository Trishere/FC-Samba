/* PERIODS PAGE — liệt kê các period (hiện tại + tương lai), mỗi cái dẫn tới ranking.html riêng */

function isCurrentPeriod(period) {

    const now = new Date();

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    return period.year === currentYear && period.months.includes(currentMonth);

}

function renderPeriod(period, index) {

    const activeClass = isCurrentPeriod(period) ? " active-period" : "";

    return `
        <a class="goal-ranking-box${activeClass}" href="ranking.html?index=${index}">

            <div class="goal-ranking-header">

                <p class="goal-period">
                    ${period.title}
                </p>

            </div>

        </a>
    `;

}

function renderHallOfFame() {

    const hallOfFame = document.getElementById("hall-of-fame");

    hallOfFame.innerHTML = hallOfFamePeriods
        .map((period, index) => renderPeriod(period, index))
        .join("");

}

renderHallOfFame();