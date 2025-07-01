document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('#home img');
    const homeLink = document.querySelector('#navigation_bar a[href="#home"]');
    document.querySelector('#navigation_bar a[href="#home"]').classList.add('active');
    const navLinks = document.querySelectorAll('#navigation_bar a[href^="#"]:not([href="#home"])');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);

            if (!targetEl) return;

            img.classList.remove('zooming');
            void img.offsetWidth;
            img.classList.add('zooming');

            img.addEventListener('animationend', function handler() {
                img.removeEventListener('animationend', handler);
                targetEl.scrollIntoView({ behavior: 'auto' });
                history.replaceState(null, '', `#${targetId}`);
            });
        });
    });

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        img.classList.remove('zooming');
        img.style.animation = '';
        img.style.transform = 'scale(1)';
        window.scrollTo({ top: 0, behavior: 'auto' });
        history.replaceState(null, '', '#home');
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const halfWindow = window.innerHeight / 20;

        const sections = [
            'home', 'about', 'skills',
            'travelling', 'contact'
        ];

        let current = 'home';

        for (let id of sections) {
            const el = document.getElementById(id);
            if (el && scrollY + halfWindow >= el.offsetTop) {
                current = id;
            }
        }

        if (location.hash !== `#${current}`) {
            history.replaceState(null, '', `#${current}`);
        }

        document.querySelectorAll('#navigation_bar a').forEach(link => {
            const hrefId = link.getAttribute('href').substring(1);
            if (hrefId === current) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        if (current === 'home') {
            img.classList.remove('zooming');
            img.style.animation = '';
            img.style.transform = 'scale(1)';
        }
    });
});