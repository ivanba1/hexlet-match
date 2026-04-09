import { candidates } from './data.js';
import { createCardHTML, updateCounter, showResults, hideResults } from './ui.js';

let currentIndex = 0;
let liked = [];
let currentCard = null;
let startX = 0;
let dragging = false;

export function renderCard(container) {
    if (!container) return;
    if (currentIndex >= candidates.length) {
        container.innerHTML = '<div style="text-align:center; padding:40px;">🏁 Все кандидаты просмотрены</div>';
        showResults(liked, candidates.length);
        return;
    }
    container.innerHTML = createCardHTML(candidates[currentIndex]);
    currentCard = document.getElementById('currentCard');
    updateCounter(candidates.length, currentIndex);
    if (currentCard) attachEvents();
}

function attachEvents() {
    if (!currentCard) return;
    currentCard.addEventListener('mousedown', onStart);
    currentCard.addEventListener('touchstart', onStart);
    currentCard.addEventListener('mouseup', onEnd);
    currentCard.addEventListener('touchend', onEnd);
    currentCard.addEventListener('mousemove', onMove);
    currentCard.addEventListener('touchmove', onMove);
}

function onStart(e) {
    dragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    if (currentCard) currentCard.style.transition = 'none';
}
function onMove(e) {
    if (!dragging || !currentCard) return;
    const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = x - startX;
    currentCard.style.transform = `translateX(${diff}px) rotate(${diff*0.05}deg)`;
    currentCard.style.opacity = 1 - Math.abs(diff)/500;
}
function onEnd(e) {
    if (!dragging || !currentCard) { dragging = false; return; }
    dragging = false;
    const endX = e.type === 'mouseup' ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
    const diff = endX - startX;
    if (diff > 100) like();
    else if (diff < -100) dislike();
    else {
        currentCard.style.transition = '0.2s';
        currentCard.style.transform = 'translateX(0) rotate(0)';
        currentCard.style.opacity = '1';
        setTimeout(() => { if(currentCard) currentCard.style.transition = ''; }, 200);
    }
}
function like() {
    if (!currentCard) return;
    liked.push(candidates[currentIndex]);
    currentCard.classList.add('swipe-right');
    setTimeout(() => { currentIndex++; renderCard(document.getElementById('cardsStack')); }, 200);
}
function dislike() {
    if (!currentCard) return;
    currentCard.classList.add('swipe-left');
    setTimeout(() => { currentIndex++; renderCard(document.getElementById('cardsStack')); }, 200);
}
export function reset() {
    currentIndex = 0;
    liked = [];
    hideResults();
    renderCard(document.getElementById('cardsStack'));
    updateCounter(candidates.length, 0);
    const stats = document.getElementById('swipeStats');
    if (stats) stats.innerHTML = `👀 Осталось: <span id="cardsLeft">${candidates.length}</span>`;
}
export function likeCurrent() { if (currentCard) like(); }
export function dislikeCurrent() { if (currentCard) dislike(); }