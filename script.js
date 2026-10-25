const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕ Close' : '☰ Menu';
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰ Menu';
        mainNav.querySelectorAll('a').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      });
    });

    document.getElementById('year').textContent = new Date().getFullYear();
