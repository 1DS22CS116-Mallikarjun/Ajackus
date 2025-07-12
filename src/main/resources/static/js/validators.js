/**
 * Form Validation and Error Handling
 * Contains all validation logic for the employee form
 */

class FormValidator {
    constructor() {
        this.errors = {};
        this.validationRules = {
            firstName: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/
            },
            lastName: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            department: {
                required: true
            },
            role: {
                required: true
            }
        };
    }

    /**
     * Validate a single field
     * @param {string} fieldName - Name of the field to validate
     * @param {string} value - Value to validate
     * @returns {string|null} Error message or null if valid
     */
    validateField(fieldName, value) {
        const rules = this.validationRules[fieldName];
        if (!rules) return null;

        // Required field validation
        if (rules.required && (!value || value.trim() === '')) {
            return `${this.getFieldDisplayName(fieldName)} is required`;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') return null;

        const trimmedValue = value.trim();

        // Min length validation
        if (rules.minLength && trimmedValue.length < rules.minLength) {
            return `${this.getFieldDisplayName(fieldName)} must be at least ${rules.minLength} characters`;
        }

        // Max length validation
        if (rules.maxLength && trimmedValue.length > rules.maxLength) {
            return `${this.getFieldDisplayName(fieldName)} must be no more than ${rules.maxLength} characters`;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(trimmedValue)) {
            return this.getPatternErrorMessage(fieldName);
        }

        return null;
    }

    /**
     * Validate entire form
     * @param {Object} formData - Form data object
     * @returns {Object} Validation result with errors and isValid flag
     */
    validateForm(formData) {
        this.errors = {};
        let isValid = true;

        for (const fieldName in this.validationRules) {
            const error = this.validateField(fieldName, formData[fieldName]);
            if (error) {
                this.errors[fieldName] = error;
                isValid = false;
            }
        }

        return {
            isValid,
            errors: { ...this.errors }
        };
    }

    /**
     * Get display name for field
     * @param {string} fieldName - Field name
     * @returns {string} Display name
     */
    getFieldDisplayName(fieldName) {
        const displayNames = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            department: 'Department',
            role: 'Role'
        };
        return displayNames[fieldName] || fieldName;
    }

    /**
     * Get pattern error message for field
     * @param {string} fieldName - Field name
     * @returns {string} Error message
     */
    getPatternErrorMessage(fieldName) {
        const messages = {
            firstName: 'First Name can only contain letters and spaces',
            lastName: 'Last Name can only contain letters and spaces',
            email: 'Please enter a valid email address'
        };
        return messages[fieldName] || 'Invalid format';
    }

    /**
     * Clear all validation errors
     */
    clearErrors() {
        this.errors = {};
    }

    /**
     * Get error for specific field
     * @param {string} fieldName - Field name
     * @returns {string|null} Error message or null
     */
    getFieldError(fieldName) {
        return this.errors[fieldName] || null;
    }

    /**
     * Check if field has error
     * @param {string} fieldName - Field name
     * @returns {boolean} True if field has error
     */
    hasFieldError(fieldName) {
        return !!this.errors[fieldName];
    }
}

/**
 * UI Validation Helper
 * Handles validation display and form state management
 */
class UIValidator {
    constructor(validator) {
        this.validator = validator;
        this.form = null;
        this.errorElements = {};
    }

    /**
     * Initialize validation for form
     * @param {HTMLFormElement} form - Form element
     */
    init(form) {
        this.form = form;
        this.setupErrorElements();
        this.setupValidationEvents();
    }

    /**
     * Setup error display elements
     */
    setupErrorElements() {
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        
        fields.forEach(fieldName => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            if (errorElement) {
                this.errorElements[fieldName] = errorElement;
            }
        });
    }

    /**
     * Setup real-time validation events
     */
    setupValidationEvents() {
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        
        fields.forEach(fieldName => {
            const input = document.getElementById(fieldName);
            if (input) {
                // Validate on blur
                input.addEventListener('blur', () => {
                    this.validateField(fieldName);
                });

                // Clear error on input
                input.addEventListener('input', () => {
                    this.clearFieldError(fieldName);
                });
            }
        });
    }

    /**
     * Validate single field and update UI
     * @param {string} fieldName - Field name to validate
     * @returns {boolean} True if field is valid
     */
    validateField(fieldName) {
        const input = document.getElementById(fieldName);
        if (!input) return true;

        const value = input.value;
        const error = this.validator.validateField(fieldName, value);
        
        this.displayFieldError(fieldName, error);
        this.updateFieldState(fieldName, !error);
        
        return !error;
    }

    /**
     * Validate entire form and update UI
     * @returns {boolean} True if form is valid
     */
    validateForm() {
        const formData = this.getFormData();
        const result = this.validator.validateForm(formData);
        
        // Display all errors
        Object.keys(result.errors).forEach(fieldName => {
            this.displayFieldError(fieldName, result.errors[fieldName]);
            this.updateFieldState(fieldName, false);
        });

        // Clear errors for valid fields
        Object.keys(this.validator.validationRules).forEach(fieldName => {
            if (!result.errors[fieldName]) {
                this.clearFieldError(fieldName);
                this.updateFieldState(fieldName, true);
            }
        });

        return result.isValid;
    }

    /**
     * Get form data
     * @returns {Object} Form data object
     */
    getFormData() {
        const formData = {};
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        
        fields.forEach(fieldName => {
            const input = document.getElementById(fieldName);
            if (input) {
                formData[fieldName] = input.value;
            }
        });

        return formData;
    }

    /**
     * Display error for field
     * @param {string} fieldName - Field name
     * @param {string|null} error - Error message or null
     */
    displayFieldError(fieldName, error) {
        const errorElement = this.errorElements[fieldName];
        if (errorElement) {
            errorElement.textContent = error || '';
            errorElement.style.display = error ? 'block' : 'none';
        }
    }

    /**
     * Clear error for field
     * @param {string} fieldName - Field name
     */
    clearFieldError(fieldName) {
        this.displayFieldError(fieldName, null);
    }

    /**
     * Update field visual state
     * @param {string} fieldName - Field name
     * @param {boolean} isValid - Whether field is valid
     */
    updateFieldState(fieldName, isValid) {
        const input = document.getElementById(fieldName);
        if (!input) return;

        input.classList.remove('form-group__input--error', 'form-group__input--valid');
        
        if (isValid) {
            input.classList.add('form-group__input--valid');
        } else {
            input.classList.add('form-group__input--error');
        }
    }

    /**
     * Clear all form errors
     */
    clearAllErrors() {
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        fields.forEach(fieldName => {
            this.clearFieldError(fieldName);
            this.updateFieldState(fieldName, true);
        });
    }

    /**
     * Reset form validation state
     */
    reset() {
        this.validator.clearErrors();
        this.clearAllErrors();
    }
}

// Create global validator instances
const formValidator = new FormValidator();
const uiValidator = new UIValidator(formValidator); 