/* PERIODS PAGE — liệt kê các period (hiện tại + tương lai), mỗi cái dẫn tới ranking.html riêng */

function renderPeriod(period, index) {

    return `
        <a class="goal-ranking-box" href="ranking.html?index=${index}">

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