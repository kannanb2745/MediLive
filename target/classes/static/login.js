// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Error elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Social login buttons
    const googleLogin = document.getElementById('googleLogin');
    const microsoftLogin = document.getElementById('microsoftLogin');

    // 🔹 Password visibility toggle
    passwordToggle.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.querySelector('.show-text').textContent = isPassword ? '🙈' : '👁️';
    });

    // 🔹 Real-time validation
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => clearFieldError('email'));
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', () => clearFieldError('password'));

    // 🔹 Form submission
    loginForm.addEventListener('submit', handleLogin);

    // 🔹 Social login handlers (placeholder only)
    googleLogin.addEventListener('click', () => handleSocialLogin('Google'));
    microsoftLogin.addEventListener('click', () => handleSocialLogin('Microsoft'));

    // 🔹 Check saved credentials
    checkSavedCredentials();

    // ================== FUNCTIONS ==================

    function validateEmail() {
        const email = emailInput.value.trim();
        if (!email) {
            showFieldError('email', 'Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        clearFieldError('email');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (!password) {
            showFieldError('password', 'Password is required');
            return false;
        }
        if (password.length < 6) {
            showFieldError('password', 'Password must be at least 6 characters');
            return false;
        }
        clearFieldError('password');
        return true;
    }

    function showFieldError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(field + 'Error');
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }

    function clearFieldError(field) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(field + 'Error');
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }

    async function handleLogin(e) {
        e.preventDefault();

        // Validate fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (!isEmailValid || !isPasswordValid) return;

        // Show loading
        setLoadingState(true);

        const data = {
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.text();
            if (response.ok) {
                if (rememberMeCheckbox.checked) {
                    saveCredentials(data.email);
                }
                showNotification("Login successful! Redirecting...", "success");
                setTimeout(() => (window.location.href = "/dashboard"), 1500);
            } else {
                showNotification(result, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showNotification("Something went wrong!", "error");
        } finally {
            setLoadingState(false);
        }
    }

    function handleSocialLogin(provider) {
        showNotification(`${provider} login is not yet implemented.`, "info");
    }

    function setLoadingState(isLoading) {
        loginBtn.disabled = isLoading;
        btnText.style.display = isLoading ? "none" : "block";
        btnLoader.style.display = isLoading ? "flex" : "none";
    }

    function saveCredentials(email) {
        try {
            localStorage.setItem("medilive_saved_email", email);
            localStorage.setItem("medilive_remember_me", "true");
        } catch (error) {
            console.warn("Could not save credentials:", error);
        }
    }

    function checkSavedCredentials() {
        try {
            const savedEmail = localStorage.getItem("medilive_saved_email");
            const rememberMe = localStorage.getItem("medilive_remember_me") === "true";
            if (savedEmail && rememberMe) {
                emailInput.value = savedEmail;
                rememberMeCheckbox.checked = true;
            }
        } catch (error) {
            console.warn("Could not load saved credentials:", error);
        }
    }

    function showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1000;
            background: ${type === "success" ? "var(--success)" : type === "error" ? "var(--error)" : "var(--primary)"};
            color: white; padding: 1rem 1.5rem; border-radius: 8px;
            box-shadow: var(--shadow-card); transform: translateX(400px);
            transition: var(--transition-smooth); max-width: 400px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => (notification.style.transform = "translateX(0)"), 100);
        setTimeout(() => {
            notification.style.transform = "translateX(400px)";
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
