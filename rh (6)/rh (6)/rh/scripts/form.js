(function() {
    const FORM = document.querySelector('.firts-form');
    const FORM_BLOCK = FORM.querySelector('.form');
    const EMAIL_INPUT = document.querySelector('.firts-form #email');
    const FORM_BTN = FORM.querySelector('.button');
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    const ERROR_HINT = FORM.querySelector('.error-hint');
    let formData = {};
    let dirtyInput = false;

    EMAIL_INPUT.addEventListener('change', (evt) => {
        formData[evt.target.type] = evt.target.value;
        if (FORM.classList.contains('error')) FORM.classList.remove('error');
    });

    EMAIL_INPUT.addEventListener('input', (evt) => {
        if (dirtyInput) {
            const isValidate = checkValidate(evt.target.value);
            
            if (!EMAIL_INPUT.value.length) {
                ERROR_HINT.innerText = 'Заполните пожалуйста поле';
                return;
            }

            if (isValidate) {
                if (FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.remove('error')
            } else {
                ERROR_HINT.innerText = 'Введите корректный email';
            }
        }
    })

    // Object.keys(formData) => ['name', 'mail']
    // Object.values(formData) => ['1', '2']

    FORM_BTN.addEventListener('click', () => {
        dirtyInput = true;
        console.log(EMAIL_INPUT.value);
        
        const isValidate = checkValidate(formData.email);
    
        if (!EMAIL_INPUT.value.trim()) {
            ERROR_HINT.innerText = 'Заполните пожалуйста поле';
            if (!FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.add('error');
            return;
        }

        if (isValidate) {
            if (FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.remove('error');
            sendForm('POST', URL, formData)
                .then(response => {                    
                    if (response.ok) {
                        clearForm();

                        // FORM.classList.add('success');
                        
                        dirtyInput = false;
                        FORM.classList.add('success');
                        setTimeout(() => FORM.classList.remove('success'), 4500);
                    }
                })
                .catch(error => {
                    console.error(error);

                    FORM.classList.add('error');
                })
        } else {
            ERROR_HINT.innerText = 'Введите корректный email';
            if (!FORM_BLOCK.classList.contains('error')) FORM_BLOCK.classList.add('error');
        }
    })

    function sendForm(method, url, body = null) {
        const headers = {
            'Content-type': 'application/json; charset=UTF-8',
        };

        if (body) {
            return fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: headers,
            })
        } else {
            return fetch(url);
        }
    }

    function clearForm() {
        EMAIL_INPUT.value = '';
        formData = {};
    }

    function checkValidate(text) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(text);
    }
})();