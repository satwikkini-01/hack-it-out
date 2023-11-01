document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const defaultEnabled = document.getElementById("earthquake");
    defaultEnabled.style.display = 'block';

    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substr(1);
            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});
