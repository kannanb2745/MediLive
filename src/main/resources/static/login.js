// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Password visibility toggle
    passwordToggle.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.querySelector('.show-text').textContent = isPassword ? '🙈' : '👁️';
    });
    
    // Real-time validation
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', clearEmailError);
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', clearPasswordError);
    
    // Form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Social login handlers
    googleLogin.addEventListener('click', () => handleSocialLogin('google'));
    microsoftLogin.addEventListener('click', () => handleSocialLogin('microsoft'));
    
    // Check for saved credentials
    checkSavedCredentials();
    
    // Email validation
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showFieldError('email', 'Email is required');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        
        clearFieldError('email');
        return true;
    }
    
    // Password validation
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
    
    // Clear error on input
    function clearEmailError() {
        clearFieldError('email');
    }
    
    function clearPasswordError() {
        clearFieldError('password');
    }
    
    // Show field error
    function showFieldError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(field + 'Error');
        
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }
    
    // Clear field error
    function clearFieldError(field) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(field + 'Error');
        
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }
    
    // Handle login form submission
    async function handleLogin(e) {
        e.preventDefault();
        
        // Validate all fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Simulate API call
            const loginData = {
                email: emailInput.value.trim(),
                password: passwordInput.value,
                rememberMe: rememberMeCheckbox.checked
            };
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Check credentials (demo purposes)
            const isValidLogin = await validateCredentials(loginData);
            
            if (isValidLogin) {
                // Save credentials if remember me is checked
                if (loginData.rememberMe) {
                    saveCredentials(loginData.email);
                }
                
                showNotification('Login successful! Redirecting...', 'success');
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                showNotification('Invalid email or password. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            setLoadingState(false);
        }
    }
    
    // Handle social login
    async function handleSocialLogin(provider) {
        showNotification(`Connecting to ${provider}...`, 'info');
        
        try {
            // Simulate social login
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification(`${provider} login successful! Redirecting...`, 'success');
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
            
        } catch (error) {
            showNotification(`${provider} login failed. Please try again.`, 'error');
        }
    }
    
    // Validate credentials (demo implementation)
    async function validateCredentials(loginData) {
        // Demo credentials for testing
        const demoCredentials = [
            { email: 'demo@medilive.ai', password: 'demo123' },
            { email: 'doctor@medilive.ai', password: 'doctor123' },
            { email: 'admin@medilive.ai', password: 'admin123' }
        ];
        
        return demoCredentials.some(cred => 
            cred.email === loginData.email && cred.password === loginData.password
        );
    }
    
    // Set loading state
    function setLoadingState(isLoading) {
        loginBtn.disabled = isLoading;
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
        } else {
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    }
    
    // Save credentials to localStorage
    function saveCredentials(email) {
        try {
            localStorage.setItem('medilive_saved_email', email);
            localStorage.setItem('medilive_remember_me', 'true');
        } catch (error) {
            console.warn('Could not save credentials:', error);
        }
    }
    
    // Check for saved credentials
    function checkSavedCredentials() {
        try {
            const savedEmail = localStorage.getItem('medilive_saved_email');
            const rememberMe = localStorage.getItem('medilive_remember_me') === 'true';
            
            if (savedEmail && rememberMe) {
                emailInput.value = savedEmail;
                rememberMeCheckbox.checked = true;
            }
        } catch (error) {
            console.warn('Could not load saved credentials:', error);
        }
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-card);
            transform: translateX(400px);
            transition: var(--transition-smooth);
            max-width: 400px;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto hide after 5 seconds
        const hideTimeout = setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key in form fields
        if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape key to close notifications
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => hideNotification(notification));
        }
    });
    
    // Focus management
    emailInput.focus();
    
    // Smooth animations on page load
    const animateElements = document.querySelectorAll('.login-card, .feature-item');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});