document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('form');
    const signBtn = document.querySelector('.login');
    const signUpLink = document.getElementById('signup-link');
    const signInLink = document.getElementById('signin-link');
    const overlay = document.getElementById('overlay');
    const signinContainer = document.getElementById('signin-container');
    const signupContainer = document.getElementById('signup-container');

    // Toggle Sign-in Form
    signBtn.addEventListener('click', () => {
        signinContainer.style.display = 'flex';
        signupContainer.style.display = 'none';
        overlay.style.display = 'block';
    });

    // Toggle Sign-up Form
    signUpLink.addEventListener('click', () => {
        signinContainer.style.display = 'none';
        signupContainer.style.display = 'flex';
    });

    // Back to Sign-in Form
    signInLink.addEventListener('click', () => {
        signupContainer.style.display = 'none';
        signinContainer.style.display = 'flex';
    });

    // Close forms when overlay is clicked
    overlay.addEventListener('click', () => {
        signinContainer.style.display = 'none';
        signupContainer.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Validation logic
    if (signUpForm) {
        signUpForm.addEventListener('submit', e => {
            e.preventDefault();
            validateInputs();
        });
    }

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase()) && email.endsWith(".com");
    };

    const validateInputs = () => {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const password2 = document.getElementById('password2');

        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();

        let isFormValid = true;

        if (usernameValue === '') {
            setError(username, 'Username is required');
            isFormValid = false;
        } else {
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address ending with ".com"');
            isFormValid = false;
        } else {
            setSuccess(email);
        }

        if (passwordValue === '') {
            setError(password, 'Password is required');
            isFormValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters.');
            isFormValid = false;
        } else {
            setSuccess(password);
        }

        if (password2Value === '') {
            setError(password2, 'Please confirm your password');
            isFormValid = false;
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords don't match");
            isFormValid = false;
        } else {
            setSuccess(password2);
        }

        if (isFormValid) {
            alert("Registration successful!");
            signUpForm.submit();
        }
    };
});
