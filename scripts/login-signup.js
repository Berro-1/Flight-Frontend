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

    // Validation logic for Sign-up Form
    if (signUpForm) {
        signUpForm.addEventListener('submit', e => {
            e.preventDefault();
            validateInputs();
        });
    }

    // Validation logic for Sign-in Form
    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleLogin();
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
            Toastify({
                text: "Registration successful!",
                duration: 3000, // Toast will auto-close after 3 seconds
                close: true,
                gravity: "top",
                position: "right",
                className: "custom-toast custom-toast-success",
                stopOnFocus: true,
            }).showToast();
            // Hide the signup modal and overlay
            signupContainer.style.display = 'none';
            overlay.style.display = 'none';
            signUpForm.submit();
        }
    };

    const handleLogin = async () => {
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value.trim();

        let isValid = true;

        // Clear previous errors
        const clearError = (element) => {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');
            errorDisplay.innerText = '';
            inputControl.classList.remove('error');
        };

        // Set error
        const setError = (element, message) => {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');
            errorDisplay.innerText = message;
            inputControl.classList.add('error');
        };

        // Validate email
        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase()) && email.endsWith(".com");
        };

        if (email === '') {
            setError(document.getElementById('signin-email'), 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError(document.getElementById('signin-email'), 'Provide a valid email address ending with ".com"');
            isValid = false;
        } else {
            clearError(document.getElementById('signin-email'));
        }

        // Validate password
        if (password === '') {
            setError(document.getElementById('signin-password'), 'Password is required');
            isValid = false;
        } else {
            clearError(document.getElementById('signin-password'));
        }

        if (isValid) {
            try {
                console.log('Attempting to log in with:', { email, password });
                const response = await fetch('http://localhost/fullstack/Flight-Backend/api/user/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                console.log('Response received:', response);

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        Toastify({
                            text: "Login successful!",
                            duration: 3000, // Toast will auto-close after 3 seconds
                            close: true,
                            gravity: "top",
                            position: "right",
                            className: "custom-toast custom-toast-success",
                            stopOnFocus: true,
                        }).showToast();
                        // Save the JWT token in local storage
                        localStorage.setItem('token', data.jwt);
                        // Hide the login modal and overlay
                        signinContainer.style.display = 'none';
                        overlay.style.display = 'none';
                        // Hide the login button
                        document.querySelector('.login').style.display = 'none';
                        // Show the logout button
                        showLogoutButton();
                    } else {
                        Toastify({
                            text: `Login failed: ${data.message}`,
                            duration: 3000, // Toast will auto-close after 3 seconds
                            close: true,
                            gravity: "top",
                            position: "right",
                            className: "custom-toast custom-toast-error",
                            stopOnFocus: true,
                        }).showToast();
                    }
                } else {
                    const errorData = await response.json();
                    Toastify({
                        text: `Login failed: ${errorData.message}`,
                        duration: 3000, // Toast will auto-close after 3 seconds
                        close: true,
                        gravity: "top",
                        position: "right",
                        className: "custom-toast custom-toast-error",
                        stopOnFocus: true,
                    }).showToast();
                }
            } catch (error) {
                console.error('Fetch error:', error);
                Toastify({
                    text: `Login failed: ${error.message}`,
                    duration: 3000, // Toast will auto-close after 3 seconds
                    close: true,
                    gravity: "top",
                    position: "right",
                    className: "custom-toast custom-toast-error",
                    stopOnFocus: true,
                }).showToast();
            }
        } else {
            Toastify({
                text: "Please fill in both fields.",
                duration: 3000, // Toast will auto-close after 3 seconds
                close: true,
                gravity: "top",
                position: "right",
                className: "custom-toast custom-toast-error",
                stopOnFocus: true,
            }).showToast();
        }
    };

    const showLogoutButton = () => {
        const nav = document.querySelector('nav ul');
        const logoutItem = document.createElement('li');
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Log out';
        logoutLink.classList.add('logout');
        logoutLink.addEventListener('click', handleLogout);

        logoutItem.appendChild(logoutLink);
        nav.appendChild(logoutItem);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        Toastify({
            text: "Logged out successfully!",
            duration: 3000, // Toast will auto-close after 3 seconds
            close: true,
            gravity: "top",
            position: "right",
            className: "custom-toast custom-toast-success",
            stopOnFocus: true,
        }).showToast();
        document.querySelector('.login').style.display = 'inline-block';
        document.querySelector('.logout').parentElement.remove();
    };
});
