export const candidates = [
    { name: "Анна", stack: "Python / Django", exp: "5 лет", github: "1.2k", hardMatch: 94, cultureFit: 88, cultureLevel: "high", location: "Москва", about: "Любит code review" },
    { name: "Дмитрий", stack: "JS / React", exp: "3 года", github: "856", hardMatch: 89, cultureFit: 76, cultureLevel: "medium", location: "СПб", about: "Быстро учится" },
    { name: "Елена", stack: "Java / Spring", exp: "7 лет", github: "2.4k", hardMatch: 98, cultureFit: 92, cultureLevel: "high", location: "Новосибирск", about: "Архитектор" },
    { name: "Максим", stack: "Go / K8s", exp: "4 года", github: "567", hardMatch: 76, cultureFit: 45, cultureLevel: "low", location: "Казань", about: "Интроверт" },
    { name: "Ольга", stack: "Ruby on Rails", exp: "6 лет", github: "1.7k", hardMatch: 91, cultureFit: 85, cultureLevel: "high", location: "Екатеринбург", about: "Наставник" },
    { name: "Иван", stack: "C++ / Unreal", exp: "8 лет", github: "3.1k", hardMatch: 96, cultureFit: 72, cultureLevel: "medium", location: "Москва", about: "Геймдев" },
    { name: "Татьяна", stack: "Data Science", exp: "3 года", github: "423", hardMatch: 82, cultureFit: 91, cultureLevel: "high", location: "СПб", about: "Коммуникабельная" },
    { name: "Сергей", stack: "PHP / Laravel", exp: "5 лет", github: "932", hardMatch: 87, cultureFit: 53, cultureLevel: "low", location: "Новосибирск", about: "Не любит code review" }
];

export function getCultureClass(level) {
    if (level === "high") return "culture-high";
    if (level === "medium") return "culture-medium";
    return "culture-low";
}
export function getCultureText(level) {
    if (level === "high") return "Высокая";
    if (level === "medium") return "Средняя";
    return "Низкая";
}