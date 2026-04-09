import { renderCard, reset, likeCurrent, dislikeCurrent } from './swipe.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cardsStack');
    if (container) renderCard(container);

    document.getElementById('likeBtn')?.addEventListener('click', likeCurrent);
    document.getElementById('dislikeBtn')?.addEventListener('click', dislikeCurrent);
    document.getElementById('resetSwipe')?.addEventListener('click', reset);

    // Форма email
    const submit = document.getElementById('submitDemo');
    const emailInput = document.getElementById('demoEmail');
    const msg = document.getElementById('demoMsg');
    if (submit) {
        submit.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (!email || !email.includes('@')) {
                msg.innerText = 'Введите корректный email';
                msg.style.color = 'red';
                return;
            }
            msg.innerText = `✅ Спасибо, ${email}!`;
            msg.style.color = 'green';
            emailInput.value = '';
            setTimeout(() => msg.innerText = '', 3000);
        });
    }
});