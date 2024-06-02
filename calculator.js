document.getElementById('addTeam').addEventListener('click', addTeam);

function addTeam() {
    const betsDiv = document.getElementById('bets');
    const betCount = betsDiv.children.length + 1;

    const betDiv = document.createElement('div');
    betDiv.classList.add('bet');
    betDiv.innerHTML = `
        <h2>ทีมที่ ${betCount}</h2>
        <label>ราคาน้ำ: <input type="text" id="water${betCount}"></label>
        <label>ผลลัพธ์: 
            <select id="result${betCount}">
                <option value="full">ได้เต็ม</option>
                <option value="half">ได้ครึ่ง</option>
                <option value="half_lose">เสียครึ่ง</option>
            </select>
        </label>
    `;
    betsDiv.appendChild(betDiv);
}

function calculate() {
    const stake = parseFloat(document.getElementById('stake').value);
    const betsDiv = document.getElementById('bets');
    const betCount = betsDiv.children.length;
    let finalMultiplier = 1;
    let hasHalfLose = false;

    for (let i = 1; i <= betCount; i++) {
        const water = parseFloat(document.getElementById(`water${i}`).value);
        const result = document.getElementById(`result${i}`).value;

        if (result === 'half') {
            finalMultiplier *= ((water - 1) / 2) + 1;
        } else if (result === 'full') {
            finalMultiplier *= water;
        } else if (result === 'half_lose') {
            finalMultiplier *= water;
            hasHalfLose = true;
        }
    }

    let finalResult = finalMultiplier * stake;
    if (hasHalfLose) {
        finalResult /= 2;
    }

    document.getElementById('result').innerText = finalResult.toFixed(2) + ' บาท (รวมทุน: ' + (finalResult + stake).toFixed(2) + ' บาท)';
}

// Initial call to add the first team
addTeam();
addTeam();
addTeam();
