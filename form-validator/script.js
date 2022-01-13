const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small')
    small.innerText = message
}

function showSuccess(input) {
    const formControl = input.parentElement;
    if (formControl.classList.contains('error')) formControl.classList.remove('error')
    formControl.classList.add('success');
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if(re.test(input.value.trim())){
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if( input.value.trim() === '' ) {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match') 
    }
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be at less ${max} characters`)
    } else {
        showSuccess(input)
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault()

    checkRequired([username, email, password, confirmPassword])
    checkLength(username, 3, 15);
    checkLength(password, 8, 16);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);
})