// Signup Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const inputs = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        userType: document.getElementById('userType'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        agreeTerms: document.getElementById('agreeTerms')
    };

    const passwordToggle = document.getElementById('passwordToggle');
    const signupBtn = document.getElementById('signupBtn');

    // 🔹 Password toggle
    passwordToggle.addEventListener('click', function () {
        const isPassword = inputs.password.type === 'password';
        inputs.password.type = isPassword ? 'text' : 'password';
        passwordToggle.textContent = isPassword ? '🙈' : '👁️';
    });

    // 🔹 Field validation on blur/input
    Object.keys(inputs).forEach(field => {
        inputs[field].addEventListener('blur', () => validateField(field));
        inputs[field].addEventListener('input', () => clearError(field));
    });

    // 🔹 Form submission (only one handler now)
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.keys(inputs).forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        if (!isValid) return;

        const data = {
            firstName: inputs.firstName.value.trim(),
            lastName: inputs.lastName.value.trim(),
            email: inputs.email.value.trim(),
            userType: inputs.userType.value.trim(),
            password: inputs.password.value
        };

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.text();
            if (response.ok) {
                showNotification("Signup successful! Redirecting...", "success");
                setTimeout(() => (window.location.href = "/dashboard"), 1500);
            } else {
                showNotification(result, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showNotification("Something went wrong!", "error");
        } finally {
            setLoading(false);
        }
    });

    // 🔹 Validation logic
    function validateField(field) {
        const value = inputs[field].value.trim();
        const errorElement = document.getElementById(field + 'Error');

        switch (field) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    showError(field, `${field === 'firstName' ? 'First' : 'Last'} name is required`);
                    return false;
                }
                break;
            case 'email':
                if (!value) {
                    showError(field, 'Email is required');
                    return false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    showError(field, 'Please enter a valid email');
                    return false;
                }
                break;
            case 'userType':
                if (!value) {
                    showError(field, 'Please select an account type');
                    return false;
                }
                break;
            case 'password':
                if (!value) {
                    showError(field, 'Password is required');
                    return false;
                }
                if (value.length < 8) {
                    showError(field, 'Password must be at least 8 characters');
                    return false;
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    showError(field, 'Please confirm your password');
                    return false;
                }
                if (value !== inputs.password.value) {
                    showError(field, 'Passwords do not match');
                    return false;
                }
                break;
            case 'agreeTerms':
                if (!inputs[field].checked) {
                    showError(field, 'You must agree to the terms');
                    return false;
                }
                break;
        }

        clearError(field);
        return true;
    }

    function showError(field, message) {
        const errorElement = document.getElementById(field + 'Error');
        inputs[field].classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(field) {
        const errorElement = document.getElementById(field + 'Error');
        inputs[field].classList.remove('error');
        errorElement.textContent = '';
    }

    function setLoading(loading) {
        signupBtn.disabled = loading;
        signupBtn.querySelector('.btn-text').style.display = loading ? 'none' : 'block';
        signupBtn.querySelector('.btn-loader').style.display = loading ? 'flex' : 'none';
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1000;
            background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
            color: white; padding: 1rem 1.5rem; border-radius: 8px;
            box-shadow: var(--shadow-card); transform: translateX(400px);
            transition: var(--transition-smooth);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => (notification.style.transform = 'translateX(0)'), 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
