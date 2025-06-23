const paginationButtons = document.querySelectorAll('.pagination_number');

paginationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('left')) return;
        paginationButtons.forEach(btn => btn.classList.remove('current'));
        button.classList.add('left', 'current');
    });
});