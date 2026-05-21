window.addEventListener('DOMContentLoaded', () => {
    
    const noteInput = document.getElementById('noteInput');
    const clearInputBtn = document.getElementById('clearInputBtn');
    const releaseBtn = document.getElementById('releaseBtn');
    const archiveList = document.getElementById('archiveList');

    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const savedDraft = localStorage.getItem('midnight_draft');
    if (savedDraft) {
        noteInput.value = savedDraft;
    }

    renderArchive();

    noteInput.addEventListener('input', () => {
        localStorage.setItem('midnight_draft', noteInput.value);
    });

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', () => {
            noteInput.value = '';
            localStorage.removeItem('midnight_draft');
            noteInput.focus();
        });
    }

    if (releaseBtn) {
        releaseBtn.addEventListener('click', () => {
const quotes = [
    "Твоя думка тепер серед зірок...",
    "Відпущено. Спи спокійно",
    "Нічне небо прийняло твої слова",
    "Голова вільна. Час для сну",
    "Ця думка більше не твоя, вона частина всесвіту",
    "Всесвіт чує тебе...",
    "Розчинено у нескінченності"
];

releaseBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text === "") return;

    let archive = JSON.parse(localStorage.getItem('midnight_archive') || '[]');
    archive.unshift({ id: Date.now(), content: text });
    localStorage.setItem('midnight_archive', JSON.stringify(archive));
    renderArchive();

    noteInput.value = '';
    localStorage.removeItem('midnight_draft');

    const overlay = document.getElementById('quoteOverlay');
    const quoteText = document.getElementById('quoteText');
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.innerText = randomQuote;

    overlay.classList.add('active');

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 3000);
});
        });
    }

    function renderArchive() {
        if (!archiveList) return;
        const archive = JSON.parse(localStorage.getItem('midnight_archive') || '[]');
        
        archiveList.innerHTML = archive.map(item => `
            <li style="background: rgba(255,255,255,0.1); margin: 10px 0; padding: 15px; border-radius: 15px; list-style: none; display: flex; justify-content: space-between; align-items: center; color: white;">
                <span style="flex: 1;">${item.content}</span>
                <span style="cursor:pointer; color: #ff4d4d; margin-left: 20px; font-weight: bold;" onclick="deleteNote(${item.id})">✕</span>
            </li>
        `).join('');
    }
});

window.deleteNote = (id) => {
    let archive = JSON.parse(localStorage.getItem('midnight_archive') || '[]');
    archive = archive.filter(item => item.id !== id);
    localStorage.setItem('midnight_archive', JSON.stringify(archive));
    location.reload();
};