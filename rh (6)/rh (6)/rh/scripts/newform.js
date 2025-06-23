(() => {
    const FORM = document.querySelector('.second-newsletter');
    const FORM_BLOCK = FORM.querySelector('.form');
    const EMAIL_INPUT = FORM.querySelector('#email-field');
    const ERROR_HINT = FORM.querySelector('.error-hint');
    let formData = {};

    EMAIL_INPUT.addEventListener('input', () => {
        formData.email = EMAIL_INPUT.value;
        if (FORM.classList.contains('error')) FORM.classList.remove('error');
    });

    FORM.addEventListener('submit', async(e) => {
        e.preventDefault();

        const isValidate = checkValidate(formData.email);

        if (!EMAIL_INPUT.value.trim()) {
            ERROR_HINT.innerText = "Заполните пожалуйста поле";
            if (!FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.add('error');
            return;
        }

        if (isValidate) {
            if (FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.remove('error');

            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    clearForm();
                    FORM_BLOCK.classList.add('success');
                    setTimeout(() => FORM_BLOCK.classList.remove('success'), 4500);
                } else {
                    FORM_BLOCK.classList.add('error');
                }
            } catch {
                FORM_BLOCK.classList.add('error');
            }
        } else {
            if (!FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.add('error');
            ERROR_HINT.innerText = "Введите корректный email";
        }

    })

    function clearForm() {
        EMAIL_INPUT.value = '';
        formData = {};
    }


    function checkValidate(text) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(text);
    }
})();