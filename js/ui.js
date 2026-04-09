import { getCultureClass, getCultureText } from './data.js';

export function createCardHTML(c) {
    const cultureClass = getCultureClass(c.cultureLevel);
    const cultureText = getCultureText(c.cultureLevel);
    
    return `
        <div class="swipe-card" id="currentCard">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div class="candidate-name">${c.name}</div>
                <div class="match-percent">${c.hardMatch}%</div>
            </div>
            <div class="candidate-stack">${c.stack}</div>
            <div class="info-row">
                <span>📅 ${c.exp}</span>
                <span>⭐ GitHub: ${c.github}</span>
                <span>📍 ${c.location}</span>
            </div>
            <div class="skills-block">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span>🧠 Hard skills</span>
                    <span><strong>${c.hardMatch}%</strong> совпадение</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>🤝 Culture fit</span>
                    <span class="culture-badge ${cultureClass}">${cultureText} (${c.cultureFit}%)</span>
                </div>
            </div>
            <p>💬 ${c.about}</p>
            <div class="swipe-hint">
                <span class="hint-dislike">❌ Дизлайк</span>
                <span class="hint-like">❤️ Лайк</span>
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
        if (liked.length > 0) {
            list.innerHTML = liked.map(c => `<li><strong>${c.name}</strong> — ${c.stack} (culture fit: ${c.cultureFit}%)</li>`).join('');
        } else {
            list.innerHTML = '<li>😢 Вы ещё не лайкнули ни одного кандидата</li>';
        }
        div.style.display = 'block';
    }
}

export function hideResults() {
    const div = document.getElementById('swipeResults');
    if (div) div.style.display = 'none';
}

export function showEmptyState(container) {
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; background: var(--card-bg); border-radius: 32px; color: var(--text-primary);">🏁 <strong>Вы просмотрели всех кандидатов!</strong><br>Нажмите "Начать заново" чтобы продолжить</div>';
    }
}