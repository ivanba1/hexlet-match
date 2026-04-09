// Данные кандидатов
const candidates = [
    { name: "Анна", stack: "Python / Django / FastAPI", exp: "5 лет", github: "1.2k", hardMatch: 94, cultureFit: 88, cultureLevel: "high", location: "Москва", about: "Любит code review и тестирование" },
    { name: "Дмитрий", stack: "JavaScript / React / Node.js", exp: "3 года", github: "856", hardMatch: 89, cultureFit: 76, cultureLevel: "medium", location: "СПб", about: "Быстро учится, ищет менторство" },
    { name: "Елена", stack: "Java / Spring / Kafka", exp: "7 лет", github: "2.4k", hardMatch: 98, cultureFit: 92, cultureLevel: "high", location: "Новосибирск", about: "Архитектор, любит документировать" },
    { name: "Максим", stack: "Go / Kubernetes", exp: "4 года", github: "567", hardMatch: 76, cultureFit: 45, cultureLevel: "low", location: "Казань", about: "Интроверт, предпочитает solo-задачи" },
    { name: "Ольга", stack: "Ruby on Rails / PostgreSQL", exp: "6 лет", github: "1.7k", hardMatch: 91, cultureFit: 85, cultureLevel: "high", location: "Екатеринбург", about: "Наставник, любит парное программирование" },
    { name: "Иван", stack: "C++ / Unreal Engine", exp: "8 лет", github: "3.1k", hardMatch: 96, cultureFit: 72, cultureLevel: "medium", location: "Москва", about: "Геймдев, сильный скилл по алгоритмам" },
    { name: "Татьяна", stack: "Data Science / Python / Pandas", exp: "3 года", github: "423", hardMatch: 82, cultureFit: 91, cultureLevel: "high", location: "СПб", about: "Коммуникабельная, любит презентовать результаты" },
    { name: "Сергей", stack: "PHP / Laravel / Vue", exp: "5 лет", github: "932", hardMatch: 87, cultureFit: 53, cultureLevel: "low", location: "Новосибирск", about: "Конфликтный, не любит code review" }
];

let currentIndex = 0;
let likedCandidates = [];
let startX = 0;
let currentCard = null;
let isDragging = false;

function getCultureClass(level) {
    if (level === "high") return "culture-high";
    if (level === "medium") return "culture-medium";
    return "culture-low";
}

function getCultureText(level) {
    if (level === "high") return "Высокая совместимость";
    if (level === "medium") return "Средняя совместимость";
    return "Низкая совместимость";
}

function renderCard() {
    const container = document.getElementById('cardsStack');
    if (!container) return;
    
    if (currentIndex >= candidates.length) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; background: white; border-radius: 32px;">🏁 <strong>Вы просмотрели всех кандидатов!</strong><br>Нажмите "Начать заново" чтобы продолжить</div>';
        document.getElementById('swipeStats').innerHTML = `✅ Вы лайкнули ${likedCandidates.length} кандидатов из ${candidates.length}`;
        document.getElementById('cardsLeft').innerText = '0';
        showResults();
        return;
    }
    
    const c = candidates[currentIndex];
    const cultureClass = getCultureClass(c.cultureLevel);
    const cultureText = getCultureText(c.cultureLevel);
    
    const cardHtml = `
        <div class="swipe-card" id="currentCard">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div class="candidate-name">${c.name}</div>
                <div class="match-percent">${c.hardMatch}%</div>
            </div>
            <div class="candidate-stack">${c.stack}</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
                <span>📅 ${c.exp}</span>
                <span>⭐ GitHub: ${c.github}</span>
                <span>📍 ${c.location}</span>
            </div>
            <div style="background: #f8fafc; border-radius: 20px; padding: 12px; margin: 12px 0;">
                <div style="display: flex; justify-content: space-between;">
                    <span>🧠 Hard skills</span>
                    <span><strong>${c.hardMatch}%</strong> совпадение</span>
                </div>
                <div style="margin-top: 8px; display: flex; justify-content: space-between;">
                    <span>🤝 Culture fit</span>
                    <span class="culture-badge ${cultureClass}">${cultureText} (${c.cultureFit}%)</span>
                </div>
            </div>
            <p style="color: #4b5563; margin: 12px 0;">💬 ${c.about}</p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
                <span style="background: #fee2e2; padding: 6px 20px; border-radius: 40px;">❌ Дизлайк</span>
                <span style="background: #dcfce7; padding: 6px 20px; border-radius: 40px;">❤️ Лайк</span>
            </div>
        </div>
    `;
    
    container.innerHTML = cardHtml;
    currentCard = document.getElementById('currentCard');
    document.getElementById('cardsLeft').innerText = candidates.length - currentIndex;
    
    if (currentCard) {
        currentCard.addEventListener('mousedown', dragStart);
        currentCard.addEventListener('touchstart', dragStart);
        currentCard.addEventListener('mouseup', dragEnd);
        currentCard.addEventListener('touchend', dragEnd);
        currentCard.addEventListener('mousemove', dragMove);
        currentCard.addEventListener('touchmove', dragMove);
    }
}

function dragStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    if (currentCard) currentCard.style.transition = 'none';
}

function dragMove(e) {
    if (!isDragging || !currentCard) return;
    e.preventDefault();
    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    const rotate = diff * 0.05;
    currentCard.style.transform = `translateX(${diff}px) rotate(${rotate}deg)`;
    currentCard.style.opacity = 1 - Math.abs(diff) / 500;
}

function dragEnd(e) {
    if (!isDragging || !currentCard) {
        isDragging = false;
        return;
    }
    isDragging = false;
    const endX = e.type === 'mouseup' ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
    const diff = endX - startX;
    
    if (diff > 100) likeCandidate();
    else if (diff < -100) dislikeCandidate();
    else {
        currentCard.style.transition = '0.2s';
        currentCard.style.transform = 'translateX(0) rotate(0)';
        currentCard.style.opacity = '1';
        setTimeout(() => { if (currentCard) currentCard.style.transition = ''; }, 200);
    }
}

function likeCandidate() {
    if (!currentCard) return;
    likedCandidates.push(candidates[currentIndex]);
    currentCard.classList.add('swipe-right');
    setTimeout(() => { currentIndex++; renderCard(); }, 200);
}

function dislikeCandidate() {
    if (!currentCard) return;
    currentCard.classList.add('swipe-left');
    setTimeout(() => { currentIndex++; renderCard(); }, 200);
}

function showResults() {
    const resultsDiv = document.getElementById('swipeResults');
    const likedList = document.getElementById('likedList');
    if (resultsDiv && likedList) {
        if (likedCandidates.length > 0) {
            likedList.innerHTML = likedCandidates.map(c => `<li><strong>${c.name}</strong> — ${c.stack} (совместимость ${c.cultureFit}%)</li>`).join('');
        } else {
            likedList.innerHTML = '<li>😢 Вы ещё не лайкнули ни одного кандидата</li>';
        }
        resultsDiv.style.display = 'block';
    }
}

function resetSwipe() {
    currentIndex = 0;
    likedCandidates = [];
    const resultsDiv = document.getElementById('swipeResults');
    if (resultsDiv) resultsDiv.style.display = 'none';
    renderCard();
    document.getElementById('swipeStats').innerHTML = `👀 Осталось кандидатов: <span id="cardsLeft">${candidates.length}</span>`;
}

// Инициализация кнопок и формы
document.addEventListener('DOMContentLoaded', () => {
    renderCard();
    
    document.getElementById('likeBtn')?.addEventListener('click', likeCandidate);
    document.getElementById('dislikeBtn')?.addEventListener('click', dislikeCandidate);
    document.getElementById('resetSwipe')?.addEventListener('click', resetSwipe);
    
    // Форма email
    const submitBtn = document.getElementById('submitDemo');
    const emailInput = document.getElementById('demoEmail');
    const msgSpan = document.getElementById('demoMsg');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (!email || !email.includes('@')) {
                msgSpan.innerText = 'Введите корректный email.';
                msgSpan.style.color = '#ef4444';
                return;
            }
            msgSpan.innerText = `✅ Спасибо, ${email}! Мы свяжемся с вами.`;
            msgSpan.style.color = '#22c55e';
            emailInput.value = '';
            setTimeout(() => msgSpan.innerText = '', 5000);
        });
    }
});