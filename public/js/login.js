function submitForm() {
    var userName = document.getElementById('userName').value;
    var password = document.getElementById('password').value;

    const isValid = validateForm(userName, password);
    if (!isValid) {
        return;
    }

    var formData = {
        userName: userName,
        password: password
    };

    // Example POST request using fetch API
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data?.message === 'Invalid password' && data?.statusCode === 400) {
                const message = `Password must have at least 8 characters.<br>
                Include at least one uppercase letter.<br>
                Include at least one lowercase letter.<br>
                Include at least one digit.<br>
                Include at least one underscore.<br>`;
                document.getElementById('password-invalid-feedback').innerHTML = message;
                document.getElementById('password').classList.add('is-invalid');
            } else {
                document.getElementById('userName').classList.remove('is-invalid');
                alert(`${userName} logged in successfully.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error scenario
        });
}

function validateForm(userName, password) {
    let isValid = true;

    if (userName.trim() === '') {
        document.getElementById('userName').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('userName').classList.remove('is-invalid');
    }

    if (password.trim() === '') {
        document.getElementById('password').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('password').classList.remove('is-invalid');
    }

    return isValid;
}

function validateOnInput(inputId) {
    var inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.classList.remove('is-invalid');
    }
}