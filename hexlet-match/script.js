const submitBtn = document.getElementById('submitDemo');
const emailInput = document.getElementById('demoEmail');
const msgSpan = document.getElementById('demoMsg');

if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (!email || !email.includes('@')) {
            msgSpan.innerText = 'Пожалуйста, введите корректный email.';
            msgSpan.style.color = '#ef4444';
            return;
        }
        msgSpan.innerText = `✅ Спасибо, ${email}! Мы свяжемся с вами при запуске MVP.`;
        msgSpan.style.color = '#22c55e';
        emailInput.value = '';
        setTimeout(() => {
            msgSpan.innerText = '';
        }, 5000);
    });
}