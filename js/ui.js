import { getCultureClass, getCultureText } from './data.js';

export function createCardHTML(c) {
    const cultureClass = getCultureClass(c.cultureLevel);
    const cultureText = getCultureText(c.cultureLevel);
    return `
        <div class="swipe-card" id="currentCard">
            <div style="display: flex; justify-content: space-between;">
                <div class="candidate-name">${c.name}</div>
                <div class="match-percent">${c.hardMatch}%</div>
            </div>
            <div class="candidate-stack">${c.stack}</div>
            <div style="display: flex; gap: 8px; margin: 12px 0;">
                <span>📅 ${c.exp}</span> <span>⭐ ${c.github}</span> <span>📍 ${c.location}</span>
            </div>
            <div style="background: #f8fafc; border-radius: 20px; padding: 12px; margin: 12px 0;">
                <div>🧠 Hard skills: <strong>${c.hardMatch}%</strong></div>
                <div>🤝 Culture fit: <span class="culture-badge ${cultureClass}">${cultureText} (${c.cultureFit}%)</span></div>
            </div>
            <p>💬 ${c.about}</p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
                <span style="background:#fee2e2; padding:6px 20px; border-radius:40px;">❌</span>
                <span style="background:#dcfce7; padding:6px 20px; border-radius:40px;">❤️</span>
            </div>
        </div>
    `;
}

export function updateCounter(total, current) {
    const span = document.getElementById('cardsLeft');
    if (span) span.innerText = total - current;
}

export function showResults(liked, total) {
    const div = document.getElementById('swipeResults');
    const list = document.getElementById('likedList');
    const stats = document.getElementById('swipeStats');
    if (stats) stats.innerHTML = `✅ Вы лайкнули ${liked.length} из ${total}`;
    if (div && list) {
        list.innerHTML = liked.map(c => `<li><strong>${c.name}</strong> — ${c.stack} (${c.cultureFit}%)</li>`).join('');
        div.style.display = 'block';
    }
}

export function hideResults() {
    const div = document.getElementById('swipeResults');
    if (div) div.style.display = 'none';
}