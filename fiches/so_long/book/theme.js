(function() {
    var saved = localStorage.getItem('ps-book-theme');
    var isDark = saved === 'dark';
    if (isDark) document.body.classList.add('dark');

    function injectButton() {
        var topbar = document.querySelector('.topbar');
        if (!topbar) return;
        var btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.title = 'Basculer mode clair / sombre';
        btn.innerHTML = isDark ? '☀ jour' : '☾ nuit';
        btn.onclick = function() {
            document.body.classList.toggle('dark');
            isDark = document.body.classList.contains('dark');
            localStorage.setItem('ps-book-theme', isDark ? 'dark' : 'light');
            btn.innerHTML = isDark ? '☀ jour' : '☾ nuit';
        };
        topbar.appendChild(btn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectButton);
    } else {
        injectButton();
    }
})();
