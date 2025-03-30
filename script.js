document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    const headerHeight = document.querySelector('header').offsetHeight;

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight - 10; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('form-message');

        if (name === '' || email === '' || message === '') {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Please fill out all fields.';
            return;
        }

        formMessage.style.color = 'green';
        formMessage.textContent = 'Message sent successfully!';
        this.reset();
    });
});
