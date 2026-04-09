import { renderCard, reset, likeCurrent, dislikeCurrent } from './swipe.js';

// ===== ТЁМНАЯ ТЕМА =====
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== TOAST УВЕДОМЛЕНИЯ =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeAllModals();
    }
});

// ===== АНКЕТА =====
document.getElementById('openResumeBtn')?.addEventListener('click', () => {
    openModal('resumeModal');
});

document.getElementById('resumeForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const telegram = document.getElementById('telegram').value;
    
    if (!fullname || !telegram) {
        showToast('Пожалуйста, заполните обязательные поля', 'error');
        return;
    }
    
    const resume = {
        fullname,
        telegram,
        github: document.getElementById('github').value,
        stack: document.getElementById('stack').value,
        experience: document.getElementById('experience').value,
        about: document.getElementById('about').value,
        date: new Date().toISOString()
    };
    
    const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    resumes.push(resume);
    localStorage.setItem('resumes', JSON.stringify(resumes));
    
    showToast(`Спасибо, ${fullname}! Ваша анкета отправлена.`, 'success');
    closeAllModals();
    document.getElementById('resumeForm').reset();
    
    const userCount = document.getElementById('userCount');
    if (userCount) {
        const current = parseInt(userCount.innerText) || 1247;
        userCount.innerText = current + 1;
    }
});

// ===== ВХОД / РЕГИСТРАЦИЯ =====
let isLoggedIn = false;

document.getElementById('loginBtn')?.addEventListener('click', () => {
    if (isLoggedIn) {
        showToast('Вы уже вошли в систему', 'success');
        return;
    }
    openModal('loginModal');
});

document.getElementById('registerBtn')?.addEventListener('click', () => {
    openModal('registerModal');
});

document.getElementById('switchToRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeAllModals();
    openModal('registerModal');
});

document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeAllModals();
    openModal('loginModal');
});

document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const telegram = document.getElementById('regTelegram').value;
    const password = document.getElementById('regPassword').value;
    
    if (!name || !email || !telegram || !password) {
        showToast('Заполните все поля', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        showToast('Пользователь с таким email уже существует', 'error');
        return;
    }
    
    users.push({ name, email, telegram, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    showToast(`Добро пожаловать, ${name}!`, 'success');
    closeAllModals();
    document.getElementById('registerForm').reset();
});

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => (u.email === login || u.telegram === login) && u.password === password);
    
    if (user) {
        isLoggedIn = true;
        showToast(`С возвращением, ${user.name}!`, 'success');
        closeAllModals();
        document.getElementById('loginForm').reset();
        
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        if (loginBtn) loginBtn.textContent = user.name.split(' ')[0];
        if (registerBtn) registerBtn.textContent = 'Выйти';
        
        registerBtn.onclick = () => {
            isLoggedIn = false;
            loginBtn.textContent = 'Вход';
            registerBtn.textContent = 'Регистрация';
            showToast('Вы вышли из системы', 'success');
            registerBtn.onclick = () => openModal('registerModal');
        };
    } else {
        showToast('Неверный логин или пароль', 'error');
    }
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cardsStack');
    if (container) renderCard(container);
    
    document.getElementById('likeBtn')?.addEventListener('click', likeCurrent);
    document.getElementById('dislikeBtn')?.addEventListener('click', dislikeCurrent);
    document.getElementById('resetSwipe')?.addEventListener('click', reset);
});

// Анимация счётчика
const userCountElement = document.getElementById('userCount');
if (userCountElement) {
    const target = parseInt(userCountElement.innerText) || 1247;
    let current = target - 23;
    const interval = setInterval(() => {
        if (current < target) {
            current++;
            userCountElement.innerText = current;
        } else {
            clearInterval(interval);
        }
    }, 50);
}